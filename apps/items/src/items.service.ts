import { Injectable } from '@nestjs/common';
import { ItemRepository } from './items.repository';
import { CreateItemDto } from './dtos/create-item.dto';
import { UPdateItemDto } from './dtos/update-item.dto';


@Injectable()
export class ItemsService {
  constructor(
    private readonly itemRepository: ItemRepository
  ){}

  async create (createItemDto: CreateItemDto){
    return this.itemRepository.create(createItemDto)

  }

  findAll(){
    return this.itemRepository.find({})
  }

  findOneItem( id: string ){
    return this.itemRepository.findOne({ id })
  }

  updateItem( id: string, updateItem: UPdateItemDto){
    return this.itemRepository.findOneAndUpdate(
      {id},
      {$set: updateItem}
    )
  }

  async deleteOne( id: string ){
    return this.itemRepository.findOneAndDelete({ id })
  }

  async deleteAll(){
    const items = await this.itemRepository.find({})

    items.map(({_id}) =>{
      return this.itemRepository.findOneAndDelete({ _id })

    })
    return "Deleted All."
    
  }
}
