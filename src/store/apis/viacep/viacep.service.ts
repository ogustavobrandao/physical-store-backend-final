import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ViaCepService{
    constructor(private readonly httpService: HttpService) {}

    async getEndereco(postalCode: string){
        try {
            const url = `https://viacep.com.br/ws/${postalCode}/json/`;
    
            const response = await firstValueFrom(this.httpService.get(url));
    
            return response.data;
            
        } catch (error) {
            return error
        }
    }
}