import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentService {
  constructor( private readonly configService: ConfigService){}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion:'2022-11-15'
    }
  );
  
  async createCharge({ card, amount}: CreateChargeDto ){
    const paymentMethod = await this.stripe.paymentMethods.create({
      type:'card',
      card,
    })

    const paymentIntent = await this.stripe.paymentIntents.create({

      payment_method: paymentMethod.id,
      amount: amount*100,
      confirm:true,
      payment_method_types:['card'],
      currency: 'thb',
    })

    return paymentIntent;
  }

}
