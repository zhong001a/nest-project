import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common'
import { ItemDocument } from './models/item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemRepository extends AbstractRepository<ItemDocument>{
    protected readonly logger = new Logger(ItemDocument.name);

    constructor(
        @InjectModel(ItemDocument.name) reservationsModel: Model<ItemDocument>,
    ){
        super(reservationsModel)
    }

}