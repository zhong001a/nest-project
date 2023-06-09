import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false})
export class ProfileDocument extends AbstractDocument{
    @Prop()
    name: string

    @Prop()
    birthdate: Date

    @Prop()
    image: string

    @Prop()
    email: string

    @Prop()
    phone: string

    @Prop()
    userId: string

}

export const ProfileSchema = SchemaFactory.createForClass(ProfileDocument)