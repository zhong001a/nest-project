import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common'
import { OrderDocument } from '../models/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderRepository extends AbstractRepository<OrderDocument>{
    protected readonly logger = new Logger(OrderDocument.name);

    constructor(
        @InjectModel(OrderDocument.name) orderModel: Model<OrderDocument>,
    ){
        super(orderModel)
    }

}