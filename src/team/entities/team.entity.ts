import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Team {

    _id?: string;

    @Prop({ type: [String], minlength: 2})
    users: string[];

    @Prop({ required: true, unique: true })
    color: string;

    @Prop({ required: true, min: 0 })
    totalPoints: number;

}

export const TeamSchema = SchemaFactory.createForClass(Team);
