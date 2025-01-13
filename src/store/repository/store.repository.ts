import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Store } from '../entity/store.entity';

@Injectable()
export class StoreRepository {
  constructor(@InjectModel(Store) private readonly storeModel: typeof Store) {}

  async all(): Promise<Store[]> {
    return this.storeModel.findAll();
  }

  async findByState(state: string): Promise<Store[]> {
    return this.storeModel.findAll({ where: {state}});
  }

  async findById(id: number): Promise<Store> {
    return this.storeModel.findByPk(id);
  }

  async create(data: Partial<Store>): Promise<Store> {
    return this.storeModel.create(data);
  }

  async update(id: number, data: Partial<Store>) {
    return this.storeModel.update(data, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.storeModel.destroy({ where: { id } });
  }
}
