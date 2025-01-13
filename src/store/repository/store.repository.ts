import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Store } from '../entity/store.entity';
import { PaginationDTO } from '../dto/pagination.dto';

@Injectable()
export class StoreRepository {
  constructor(@InjectModel(Store) private readonly storeModel: typeof Store) {}

  async all(limit?: number, offset?: number): Promise<{ rows: Store[], count:number }> {
    return this.storeModel.findAndCountAll({limit, offset});
  }

  async findByCep(limit: number, offset: number){

  }

  async findByState(state: string, limit: number, offset: number): Promise<{ rows: Store[], count:number }> {
    return this.storeModel.findAndCountAll({ where: {state}, limit, offset});
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
