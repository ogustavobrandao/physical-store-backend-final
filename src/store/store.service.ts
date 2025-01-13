import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StoreRepository } from './repository/store.repository';
import { CreateStoreDTO } from './dto/create-store.dto';
import { ViaCepService } from './apis/viacep/viacep.service';
import { OrsService } from './apis/ors/ors.service';
import { GeoCodeService } from './apis/geocode/geocode.service';
import { PaginationDTO } from './dto/pagination.dto';
import { CorreioService } from './apis/correios/correios.service';
import { UpdateStoreDTO } from './dto/update-store.dto';

@Injectable()
export class StoreService {
    constructor(
        private readonly storeRepository: StoreRepository,
        private readonly geocodeService: GeoCodeService,
        private readonly viacepService: ViaCepService,
        private readonly orsService: OrsService,
        private readonly correioService: CorreioService,
    ){}

    async create(data: CreateStoreDTO) {
        try {
            const endereco = await this.viacepService.getEndereco(data.postalCode);
            const {longitude, latitude} = await this.geocodeService.obterCoordenadasSeparadas(data.postalCode);

            const store = {
                ...data,
                city: endereco.localidade,
                state: endereco.estado,
                longitude,
                latitude
            };
            
            return await this.storeRepository.create(store);
        } catch (error: any) {
            throw new Error('Erro ao criar store');
        }
    }

    async findByCep(cep, paginationDto: PaginationDTO){

        const cepInput = await this.geocodeService.obterCoordenadas(cep);
        const {rows} = await this.storeRepository.all();
        let pins = [];
        
        const storesProximas = (await Promise.all(
            rows.map(async (element) => {

                const distancia = await this.orsService.getDistancia(cepInput, `${element.longitude},${element.latitude}`);

                const frete = this.correioService.frete(cep.replace(/-/g, ''), element.postalCode.replace(/-/g, ''))
                if(Number(distancia) <= 50){
                    pins.push({
                        
                        position:{
                            lat: element.latitude,
                            lng: element.longitude,
                        },
                        title: element.storeName
                        });

                    if(element.type == 'PDV'){
                        return {
                            'name': element.storeName,
                            'city': element.city,
                            'postalCode': element.postalCode,
                            'type': element.type,
                            'distance': `${distancia}km`,
                            'value': frete,
                        }
                    }else{
                        return {
                            'name': element.storeName,
                            'city': element.city,
                            'postalCode': element.postalCode,
                            'type': element.type,
                            'distance': `${distancia}km`,
                            'value': frete,
                        }
                    }
                }else{
                    if(element.type == 'LOJA'){
                        return {
                            'name': element.storeName,
                            'city': element.city,
                            'postalCode': element.postalCode,
                            'type': element.type,
                            'distance': distancia,
                            'value': frete,
                        }
                    }      
                }
                return null;
            })
        )).filter((store) => store !== null)
        .sort((storeA, storeB) => storeA!.distance - storeB!.distance);  

        const { page, limit } = paginationDto;
        const offset = (page - 1) * limit;

        const storesPagination = storesProximas.slice(offset, offset + limit);
        return {
            stores: storesPagination,
            pins,
            limit,
            offset,
            total: storesProximas.length,
        }
    }

    async findByState(state: string, paginationDto: PaginationDTO) {
        try {
            const { page, limit } = paginationDto;
    
            const offset = (page - 1) * limit;
        
            const {rows, count} = await this.storeRepository.findByState(state, limit, offset);

            if(!rows){
                throw new HttpException('Nenhuma loja encontrada', HttpStatus.NOT_FOUND);
            }
            
            return {
                stores: rows,
                limit,
                offset,
                total: count
            };

        } catch (error: any) {

            throw new Error('Erro ao buscar store');
        }
    }

    async findById(id: number) {
        try {
            const store = await this.storeRepository.findById(id);

            if(!store){
                throw new HttpException('Nenhuma loja encontrada', HttpStatus.NOT_FOUND);
            }
            
            return {
                store,
                limit: 1,
                offset: 0,
                total: 1
            };
        } catch (error: any) {

            throw new Error('Erro ao buscar store');
        }
    }

    async all(paginationDto: PaginationDTO) {
        try {
            const { page, limit } = paginationDto;
    
            const offset = (page - 1) * limit;
        
            const {rows, count} = await this.storeRepository.all(limit, offset);

            if (!rows) {
                throw new HttpException('Nenhuma loja encontrada', HttpStatus.NOT_FOUND);
            }

            return {
                stores: rows,
                limit,
                offset,
                total: count
            };
        } catch (error) {

            throw new Error('Erro ao buscar todas as lojas');
        }
    }

    async update(id: number, data: UpdateStoreDTO){
        try {
            const store = await this.storeRepository.findById(id);
            
            if(!store){
                throw new HttpException('Nenhuma loja encontrada', HttpStatus.NOT_FOUND);
            }

            await store.update(data);

            return store
        } catch (error) {

            throw new Error('Erro ao atualizar store');
        }
    }

    async delete(id: number) {
        try {
            const store = await this.storeRepository.findById(id);

            if(!store){
                throw new HttpException('Nenhuma loja encontrada', HttpStatus.NOT_FOUND);

            }

            await store.destroy();
        } catch (error) {

            throw new Error('Erro ao deletar store');
        }
    }
}
