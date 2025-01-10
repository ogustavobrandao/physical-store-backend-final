import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

export class GeoCodeService{
    constructor(private readonly httpService: HttpService) {}

    async obterCoordenadas(postalCode: string){
        const apiKeyGeo = process.env.API_KEY_GEOCODE;
        const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(postalCode)}&apiKey=${apiKeyGeo}`;

        const response = await firstValueFrom(this.httpService.get(url));
        const { lat: latitude, lng: longitude } = response.data.items[0].position;

        return `${longitude},${latitude}`;
    }
}