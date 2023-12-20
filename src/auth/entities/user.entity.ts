import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    _id?: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    name: string;

    @Prop({minlength: 6, required: true})
    password?: string;

    @Prop({type:[String], default: ['user']})
    roles: string[];

    @Prop({required: true, default: false})
    hasCompanion: boolean;

    @Prop({required: true})
    companionName: string;

    @Prop({required: true})
    event: string;

    @Prop({required: true})
    presentation: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
