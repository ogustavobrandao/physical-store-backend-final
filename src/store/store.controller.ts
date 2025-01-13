import { Body, Controller, Get, Post, Put, Param, Delete, ParseIntPipe, Query} from '@nestjs/common';
import { get } from 'http';
import { StoreService } from './store.service';
import { CreateStoreDTO } from './dto/create-store.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { UpdateStoreDTO } from './dto/update-store.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('store')
@Controller('stores')
export class StoreController {
    constructor(
        private readonly storeService: StoreService,     
    ) {}

    @ApiParam({ name: 'id', description: 'ID da loja' })
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
    
    @ApiParam({ name: 'state', description: 'Estado da loja' })
    @Get('state/:state')
    async storeByState(@Param('state') state: string, @Query() paginationDto: PaginationDTO){
        return this.storeService.findByState(state, paginationDto)
    }
    
    @Post()
    async store(@Body() body: CreateStoreDTO, res: Response){
        return this.storeService.create(body);
    }

    @ApiParam({ name: 'id', description: 'ID da loja' })
    @Put(':id')
    async update(@Body() body: UpdateStoreDTO, @Param('id', ParseIntPipe) id:number, res: Response){
        return this.storeService.update(id, body)
    }

    @ApiParam({ name: 'id', description: 'ID da loja' })
    @Delete(':id')
    async destroy(@Param('id', ParseIntPipe) id:number, res: Response){
        return this.storeService.delete(id);
    }
}
