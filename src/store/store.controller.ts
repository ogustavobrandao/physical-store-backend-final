import { Body, Controller, Get, Post, Put, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { get } from 'http';
import { StoreService } from './store.service';
import { CreateStoreDTO } from './dto/create-store.dto';

@Controller('stores')
export class StoreController {
    constructor(
        private readonly storeService: StoreService,     
    ) {}

    @Get(':id')
    async storeById(@Param('id', ParseIntPipe) id:number){
        return this.storeService.findById(id)
    }

    @Get()
    async listAll(req: Request, res: Response){
        return this.storeService.all();
    }

    @Get('cep/:cep')
    async storeByCep(@Param('cep') cep:string){
        return this.storeService.findByCep(cep)
    }

    @Get('state/:state')
    async storeByState(@Param('state') state: string){
        return this.storeService.findByState(state)
    }
    
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
}
