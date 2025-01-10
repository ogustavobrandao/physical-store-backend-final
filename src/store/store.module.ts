import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Store } from './entity/store.entity';
import { DatabaseModule } from 'src/database/database.module';
import { StoreRepository } from './repository/store.repository';
import { ApiModule } from './apis/apis.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Store]),
    ApiModule
  ],
  providers: [StoreService, StoreRepository],
  controllers: [StoreController]
})
export class StoreModule {}
