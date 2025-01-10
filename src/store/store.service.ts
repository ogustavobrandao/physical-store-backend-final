import { Injectable } from '@nestjs/common';
import { StoreRepository } from './repository/store.repository';
import { CreateStoreDTO } from './dto/create-store.dto';
import { GeoCodeService } from './apis/geocode/geocode.service';
import { ViaCepService } from './apis/viacep/viacep.service';
import { OrsService } from './apis/ors/ors.service';

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

                const {storeName, address1, postalCode, telephoneNumber, emailAddress} = element;

                if(Number(distancia) <= 50){
                    if(element.type == 'store'){

                    }else{
            
                    }
                }else{
                    if(element.type == 'store'){

                    }else{
            
                    }
                }
                return null;
            })
        )).filter((store) => store !== null)
        .sort((storeA, storeB) => storeA!.distancia - storeB!.distancia);



        

    }

    async findById(id: number) {
        try {
            const store = await this.storeRepository.findById(id);

            if(!store){
                throw new Error('Store não encontrada');
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
                throw new Error('Nenhuma store encontrada');
            }

            return stores;
        } catch (error: any) {
            if (error instanceof Error) {
                throw error;
            }

            throw new Error('Erro ao buscar todas as stores');
        }
    }

    async update(id: number, data: any){
        try {
            const store = await this.storeRepository.findById(id);
            
            if(!store){
                throw new Error('Store não encontrada');
            }

            await store.update(data);

            return store
        } catch (error: any) {

            throw new Error('Erro ao atualizar store');
        }
    }

    async delete(id: number) {
        try {
            const store = await this.storeRepository.findById(id);

            if(!store){
                throw new Error('Store não encontrada');
            }

            await store.destroy();
        } catch (error: any) {

            throw new Error('Erro ao deletar store');
        }
    }
}
