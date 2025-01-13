import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class CorreioService{
    constructor(private readonly httpService: HttpService) {}

    async frete(cepDestino: string, cepOrigem: string){
        try {
            const url = `https://www.correios.com.br/@@precosEPrazosView`;
    
            const response = await firstValueFrom(this.httpService.post(url, {
                cepDestino,
                cepOrigem,
                comprimento: '20',
                largura: '15',
                altura: '10'
            }
        ));
    
            return response.data;
            
        } catch (error) {
            return error
        }
    }
}