import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/auth/entities/user.entity";

@Schema()
export class Duo {

    _id?: string;

    @Prop({ type: [User], minlength: 2, maxlength: 2 })
    users: User[];

    @Prop({ minlength: 2, required: true, unique: true })
    color: string;

    @Prop({ required: true, min: 0 })
    totalPoints: number;

}

export const DuoSchema = SchemaFactory.createForClass(Duo);
