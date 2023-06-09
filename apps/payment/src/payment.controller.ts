import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

@MessagePattern('create_charge')
@UsePipes(new ValidationPipe())
  async createCharge(@Payload() data: CreateChargeDto){
    console.log(data)
    return this.paymentService.createCharge(data);
  }
}
