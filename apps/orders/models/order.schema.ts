import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";
import { ItemDto } from "../dtos/item.dto";

@Schema({ versionKey: false})
export class OrderDocument extends AbstractDocument{

    @Prop()
    timestamp: Date;
    
    @Prop()
    userId: string; 

    @Prop()
    products: [
      {
        product:ItemDto 
      }
    ]
    
    @Prop()
    total: number;

    @Prop({ default: "awaiting"})
    status: string;

    @Prop()
    invoiceId: string
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument)
