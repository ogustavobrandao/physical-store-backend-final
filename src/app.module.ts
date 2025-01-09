import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LojaModule } from './loja/loja.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,  // variáveis do .env acessiveis no projeto
  }), DatabaseModule, LojaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
