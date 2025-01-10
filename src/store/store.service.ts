import { Injectable } from '@nestjs/common';
import { StoreRepository } from './repository/store.repository';
import { CreateStoreDTO } from './dto/create-store.dto';

@Injectable()
export class StoreService {
    constructor(private readonly storeRepository: StoreRepository){}

    async create(data: CreateStoreDTO) {
        try {
            return await this.storeRepository.create(data);
        } catch (error: any) {
            throw new Error('Erro ao criar store');
        }
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
