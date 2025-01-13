import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StoreRepository } from './repository/store.repository';
import { CreateStoreDTO } from './dto/create-store.dto';
import { ViaCepService } from './apis/viacep/viacep.service';
import { OrsService } from './apis/ors/ors.service';
import { GeoCodeService } from './apis/geocode/geocode.service';

@Injectable()
export class StoreService {
    constructor(
        private readonly storeRepository: StoreRepository,
        private readonly geocodeService: GeoCodeService,
        private readonly viacepService: ViaCepService,
        private readonly orsService: OrsService,
    ){}

    async create(data: CreateStoreDTO) {
        try {
            return await this.storeRepository.create(data);
        } catch (error: any) {
            throw new Error('Erro ao criar store');
        }
    }

    async findByCep(cep){

        const cepInput = await this.geocodeService.obterCoordenadas(cep);
        const stores = await this.all();

        const storesProximas = (await Promise.all(
            stores.map(async (element) => {
                const coordenada = await this.geocodeService.obterCoordenadas(element.postalCode);
                const distancia = await this.orsService.getDistancia(cepInput, coordenada);

                if(Number(distancia) <= 50){
                    if(element.type == 'PDV'){

                    }else{
            
                    }
                }else{
                    if(element.type == 'LOJA'){

                    }      
                }
                return null;
            })
        )).filter((store) => store !== null)
        .sort((storeA, storeB) => storeA!.distancia - storeB!.distancia);  

        return storesProximas
    }

    async findByState(state: string) {
        try {
            const store = await this.storeRepository.findByState(state);

            if(!store){
                throw new HttpException('Nenhuma loja encontrada', HttpStatus.NOT_FOUND);
            }
            
            return store;
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
            
            return store;
        } catch (error: any) {

            throw new Error('Erro ao buscar store');
        }
    }

    async all() {
        try {
            const stores = await this.storeRepository.all();

            if (stores.length === 0) {
                throw new HttpException('Nenhuma loja encontrada', HttpStatus.NOT_FOUND);
            }

            return stores;
        } catch (error) {

            throw new Error('Erro ao buscar todas as stores');
        }
    }

    async update(id: number, data: any){
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
