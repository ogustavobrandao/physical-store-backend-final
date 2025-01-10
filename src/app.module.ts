import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,  // variáveis do .env acessiveis no projeto
  }), DatabaseModule, StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
