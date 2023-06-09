import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";


@Schema({ versionKey: false})
export class ItemDocument extends AbstractDocument{

    @Prop()
    id: string

    @Prop()
    name: string

    @Prop()
    imageUrl: string

    @Prop()
    price: number

    @Prop()
    color:string

    @Prop()
    description:string

}
export const ItemSchema = SchemaFactory.createForClass(ItemDocument)
// "imageUrl": "https://image.katexoxo.com/uploads/images/kxo_20220912112207f2jnh.jpg",
// "price": 180000,
// "color": "Multicolor",
// "description":