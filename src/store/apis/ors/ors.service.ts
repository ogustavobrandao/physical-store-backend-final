import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

export class OrsService{
    constructor(private readonly httpService: HttpService) {}

    async getDistancia(start: string, end: string){
        const apiKey = process.env.API_KEY;
        const url = `https://api.openrouteservice.org/v2/directions/driving-car`;
    
        const response = await firstValueFrom(
        this.httpService.get(url, {
            params: {
            api_key: apiKey,
            start: start,
            end: end,
            },
            headers: {
            'Accept':
                'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            },
        }),
        );

        const distance =
        response.data.features[0].properties.segments[0].distance / 1000;

        return distance;
    }
}