import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

export class ViaCepService{
    constructor(private readonly httpService: HttpService) {}

    async getEndereco(postalCode: string){
        const url = `https://viacep.com.br/ws/${postalCode}/json/`;

        const response = await firstValueFrom(this.httpService.get(url));

        return response.data;
    }
}