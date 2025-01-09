import { Body, Controller, Get, Post, Put, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { get } from 'http';
import { LojaService } from './loja.service';

@Controller('lojas')
export class LojaController {
    constructor(private readonly lojaService: LojaService) {}

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id:number){

        return this.lojaService.findById(id)
    }
    @Get()
    async index(req: Request, res: Response){
        return this.lojaService.all();

    }
    @Post()
    async store(@Body() body, res: Response){

        return this.lojaService.create(body);

    }
    @Put(':id')
    async update(@Body() body, @Param('id', ParseIntPipe) id:number, res: Response){

        return this.lojaService.update(id, body)

    }
    @Delete(':id')
    async destroy(@Param('id', ParseIntPipe) id:number, res: Response){

        return this.lojaService.delete(id);

    }
    @Get()
    async buscarLojaMaisProxima(@Body body, res: Response){
        const errors = validateCep(body.cep);

        if (errors.length > 0) {
          return res.status(400).json({ message: 'Erro de validação do CEP', details: errors });
        }

        const cepInput = await obterCoordenadas(body.cep);
        const lojas = await this.lojaService.all();
        
        const lojasProximas = (await Promise.all(
            lojas.map(async (element) => {
                const coordenada = await obterCoordenadas(element.cep);
                const distancia = await getDistancia(cepInput, coordenada);

                const {nome, logradouro, numero, cep, telefone, email} = element;

                if(Number(distancia) <= 100){
                    const {bairro, localidade, estado, regiao} = await getEndereco(element.cep);
                    return { nome, logradouro, numero, cep, ...(bairro && {bairro}), cidade:localidade, estado, regiao, ...(telefone && {telefone}), ...(email && {email}), distancia}
                }
                return null;
            })
        )).filter((loja) => loja !== null)
        .sort((lojaA, lojaB) => lojaA!.distancia - lojaB!.distancia);
        
        if(lojasProximas.length === 0){
            return res.status(404).json({message: 'Nenhuma loja encontrada a uma distância de 100 km.'})
        }

        const lojasDistanciaFormatada = lojasProximas.map(loja => ({
            ...loja,
            distancia: `${Number(loja!.distancia).toFixed(2)} km`
        }))

        return res.status(200).json(lojasDistanciaFormatada);
    }
}
