import { Module } from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaController } from './loja.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Loja } from './entity/loja.entity';
import { DatabaseModule } from 'src/database/database.module';
import { LojaRepository } from './repository/loja.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Loja]),
  ],
  providers: [LojaService, LojaRepository],
  controllers: [LojaController]
})
export class LojaModule {}
