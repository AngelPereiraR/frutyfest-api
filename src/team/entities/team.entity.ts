import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/auth/entities/user.entity";

@Schema()
export class Team {

    _id?: string;

    @Prop({ type: [User], minlength: 1})
    users: User[];

    @Prop({ required: true, unique: true })
    color: string;

    @Prop({ required: true, min: 0 })
    totalPoints: number;

}

export const TeamSchema = SchemaFactory.createForClass(Team);
