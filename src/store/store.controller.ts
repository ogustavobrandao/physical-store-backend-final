import { Body, Controller, Get, Post, Put, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { get } from 'http';
import { StoreService } from './store.service';
import { CreateStoreDTO } from './dto/create-store.dto';
import { ViaCepService } from './apis/viacep/viacep.service';
import { OrsService } from './apis/ors/ors.service';
import { GeoCodeService } from './apis/geocode/geocode.service';

@Controller('stores')
export class StoreController {
    constructor(
        private readonly storeService: StoreService,     
        private readonly viacepService: ViaCepService,
        private readonly orsService: OrsService,
        private readonly geocodeService: GeoCodeService,) {}

    @Get(':id')
    async storeById(@Param('id', ParseIntPipe) id:number){

        return this.storeService.findById(id)
    }
    @Get()
    async listAll(req: Request, res: Response){
        return this.storeService.all();

    }

    async storeByCep
    async storeByState

    
    @Post()
    async store(@Body() body: CreateStoreDTO, res: Response){

        return this.storeService.create(body);

    }
    @Put(':id')
    async update(@Body() body, @Param('id', ParseIntPipe) id:number, res: Response){

        return this.storeService.update(id, body)

    }
    @Delete(':id')
    async destroy(@Param('id', ParseIntPipe) id:number, res: Response){

        return this.storeService.delete(id);

    }
    @Get('buscarLojas')
    async buscarStoreMaisProxima(@Body() body, res: Response){

        const cepInput = await this.geocodeService.obterCoordenadas(body.cep);
        const stores = await this.storeService.all();
        
        const storesProximas = (await Promise.all(
            stores.map(async (element) => {
                const coordenada = await this.geocodeService.obterCoordenadas(element.postalCode);
                const distancia = await this.orsService.getDistancia(cepInput, coordenada);

                const {storeName, address1, postalCode, telephoneNumber, emailAddress} = element;

                if(Number(distancia) <= 100){
                    const {bairro, localidade, estado, regiao} = await this.viacepService.getEndereco(element.postalCode);
                    return { storeName, address1, city:localidade, distancia}
                }
                return null;
            })
        )).filter((store) => store !== null)
        .sort((storeA, storeB) => storeA!.distancia - storeB!.distancia);
        
        if(storesProximas.length === 0){
            return ({message: 'Nenhuma store encontrada a uma distância de 100 km.'})
        }

        const storesDistanciaFormatada = storesProximas.map(store => ({
            ...store,
            distancia: `${Number(store!.distancia).toFixed(2)} km`
        }))

        return storesDistanciaFormatada;
    }
}
