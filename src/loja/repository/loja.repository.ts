import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Loja } from '../entity/loja.entity';

@Injectable()
export class LojaRepository {
  constructor(@InjectModel(Loja) private readonly lojaModel: typeof Loja) {}

  async all(): Promise<Loja[]> {
    return this.lojaModel.findAll();
  }

  async findById(id: number): Promise<Loja> {
    return this.lojaModel.findByPk(id);
  }

  async create(data: Partial<Loja>): Promise<Loja> {
    return this.lojaModel.create(data);
  }

  async update(id: number, data: Partial<Loja>) {
    return this.lojaModel.update(data, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.lojaModel.destroy({ where: { id } });
  }
}
