import { Injectable } from '@nestjs/common';
import { LojaRepository } from './repository/loja.repository';
import { CreateLojaDTO } from './dto/create-loja.dto';

@Injectable()
export class LojaService {
    constructor(private readonly lojaRepository: LojaRepository){}

    async create(data: CreateLojaDTO) {
        try {
            return await this.lojaRepository.create(data);
        } catch (error: any) {
            throw new Error('Erro ao criar loja');
        }
    }

    async findById(id: number) {
        try {
            const loja = await this.lojaRepository.findById(id);

            if(!loja){
                throw new Error('Loja não encontrada');
            }
            
            return loja;
        } catch (error: any) {

            throw new Error('Erro ao buscar loja');
        }
    }

    async all() {
        try {
            const lojas = await this.lojaRepository.all();

            if (lojas.length === 0) {
                throw new Error('Nenhuma loja encontrada');
            }

            return lojas;
        } catch (error: any) {
            if (error instanceof Error) {
                throw error;
            }

            throw new Error('Erro ao buscar todas as lojas');
        }
    }

    async update(id: number, data: any){
        try {
            const loja = await this.lojaRepository.findById(id);
            
            if(!loja){
                throw new Error('Loja não encontrada');
            }

            await loja.update(data);

            return loja
        } catch (error: any) {

            throw new Error('Erro ao atualizar loja');
        }
    }

    async delete(id: number) {
        try {
            const loja = await this.lojaRepository.findById(id);

            if(!loja){
                throw new Error('Loja não encontrada');
            }

            await loja.destroy();
        } catch (error: any) {

            throw new Error('Erro ao deletar loja');
        }
    }
}
