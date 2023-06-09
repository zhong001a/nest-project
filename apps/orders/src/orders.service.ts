import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderRepository } from './orders.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PayOrderDto } from '../dtos/pay-order.dto';
import { map } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentService: ClientProxy,
  ) { }

  async createOder(createOder: CreateOrderDto, total: number, userId: string) {
    return this.orderRepository.create({
      timestamp:new Date(),
      userId,
      ...createOder,
      status: "awaiting payment",
      total,
      invoiceId: ""
    })
  }

  async findUserOrders( id: string ){
    console.log(id)
    return this.orderRepository.find({ userId: id })
  }

  async findAll() {
    return this.orderRepository.find({})
  }

  async findOne(_id: string) {
    return this.orderRepository.findOne({ _id })
  }

  async PayOrder(_id: string, payOrderDto: PayOrderDto) {
    const order = await this.orderRepository.findOne({ _id })
    console.log(order.total, "\t", payOrderDto.charge.amount)
    if (order.total != payOrderDto.charge.amount) {
      throw new BadRequestException("The amount does not correspond to the price of the goods to be paid.")
    }

    return this.paymentService
      .send('create_charge',  payOrderDto.charge)
      .pipe(
        map((res)=>{
            return this.orderRepository.findOneAndUpdate(
              { _id },
              {
                invoiceId: res.id,
                status: "paid",
                timestamp:new Date()
              }
            );
        }),
      );
  }

  async updateOrder( _id: string, createOrderDto: CreateOrderDto, orderPrice: number){
    return this.orderRepository.findOneAndUpdate(
      { _id },
      {
        products:createOrderDto,
        total: orderPrice
      }
    );
  }


  async deleteAll() {
    const order = await this.orderRepository.find({});
    order.map(({ _id }) => {
      return this.orderRepository.findOneAndDelete({ _id })
    })
  }
}
