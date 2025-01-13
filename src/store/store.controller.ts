import { Body, Controller, Get, Post, Put, Param, Delete, ParseIntPipe, Query} from '@nestjs/common';
import { get } from 'http';
import { StoreService } from './store.service';
import { CreateStoreDTO } from './dto/create-store.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { UpdateStoreDTO } from './dto/update-store.dto';

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
    async listAll(@Query() paginationDto: PaginationDTO){
        return this.storeService.all(paginationDto);
    }

    @Get('cep/:cep')
    async storeByCep(@Param('cep') cep:string, @Query() paginationDto: PaginationDTO){
        return this.storeService.findByCep(cep, paginationDto)
    }

    @Get('state/:state')
    async storeByState(@Param('state') state: string, @Query() paginationDto: PaginationDTO){
        return this.storeService.findByState(state, paginationDto)
    }
    
    @Post()
    async store(@Body() body: CreateStoreDTO, res: Response){
        return this.storeService.create(body);
    }

    @Put(':id')
    async update(@Body() body: UpdateStoreDTO, @Param('id', ParseIntPipe) id:number, res: Response){
        return this.storeService.update(id, body)
    }

    @Delete(':id')
    async destroy(@Param('id', ParseIntPipe) id:number, res: Response){
        return this.storeService.delete(id);
    }
}
