import { Controller, Get, Post, Body, Delete, Param, UseGuards, Patch, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto';

import { CurrentUser, JwtAuthGuard, UserDto, Products } from '@app/common';
import { PayOrderDto } from '../dtos/pay-order.dto';

@Controller()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) { }

  @Get('/myorders')
  @UseGuards(JwtAuthGuard)
  async findMyOrders(@CurrentUser() user: UserDto)
  {
    return this.ordersService.findUserOrders(user._id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Products() products: any,@CurrentUser() user: UserDto) {
    let orderPrice: number = 0;
    const productsOrder = createOrderDto.products.map((product: any) => ({
      id: product.id,
      quantity: product.quantity,
    }));

    productsOrder.map(({ id, quantity }) => {
      for (const product of products) {
        if (product.id === id) {
          console.log(product.price)
          orderPrice = orderPrice + (product.price * quantity)
        }
      }
    })

    return this.ordersService.createOder(createOrderDto, orderPrice,user._id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findProductOrder(@Param('id') id: string, @Products() products: any) {
    const order = await this.ordersService.findOne(id)
    const productsOrder = order.products.map((product: any) => ({
      id: product.id,
      quantity: product.quantity,
    }));

    const getProduct = productsOrder.map(({ id, quantity }) => {
      for (const product of products) {
        if (product.id === id) {
          return { product, quantity }
        }
      }
    })
    return getProduct
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllOrder() {
    return await this.ordersService.findAll()
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateOrderDto:PayOrderDto)
  {
    const order = await this.ordersService.findOne(id);
    if(order.status === "paid"){
      throw new BadRequestException("This order already paid.")
    }
    return await this.ordersService.PayOrder(id,updateOrderDto)
  }

  @Patch('cancel/:id')
  @UseGuards(JwtAuthGuard)
  async cancelOrder(@Param('id') id: string)
  {
    const order = await this.ordersService.findOne(id);
    if(order.status === "paid"){
      throw new BadRequestException("This order already paid.")
    }

    return await this.ordersService.cancelOrder( id, "calcel" )
  }

  @Patch('pay/:id')
  @UseGuards(JwtAuthGuard)
  async payOrder(@Param('id') id: string, @Body() payOrder:PayOrderDto )
  {
    const order = await this.ordersService.findOne(id);
    if(order.status === "paid" || order.status === "cancel"){
      throw new BadRequestException("This order already paid or canceled.")
    }

    return await this.ordersService.PayOrder( id, payOrder)
    // return payOrder
  }

  @Delete('id')
  @UseGuards(JwtAuthGuard)
  async deleteOne(@Param('id') id: string) {
    return await this.ordersService.deleteOne(id)
  }


  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteAll() {
    return await this.ordersService.deleteAll()
  }

}
