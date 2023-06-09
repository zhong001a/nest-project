import { Controller, Post, Get, Param, Delete, Patch, Body, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { UPdateItemDto } from './dtos/update-item.dto';
const Items = require('./shop-items.json')
import { JwtAuthGuard } from '@app/common';

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createItem (){
    Items.map((item:CreateItemDto)=>{
      return this.itemsService.create(item)
    })

    return "Created."
  }

  @Get(':id')
  findOneItem(@Param('id') id: string){
    return this.itemsService.findOneItem( id )
  }

  @Get()
  findItem (){
    return this.itemsService.findAll()
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateItem(@Param('id') id: string, @Body() updateItem: UPdateItemDto ){
    return this.itemsService.updateItem(id,updateItem)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteOnce(@Param('id') id:string ){
    return this.itemsService.deleteOne(id)
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteAll(){
    return this.itemsService.deleteAll()
  }

  
}