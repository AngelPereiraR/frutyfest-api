import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class Trial {

    _id?: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, min: 1 })
    maxPoints: number;

    @Prop({ required: true, min: 1 })
    pointsDecrease: number;

    @Prop({ required: true, min: 1 })
    maxTeams: number;

    @Prop({ required: true, min: 0 })
    teamsAssignated: number;

}

export const TrialSchema = SchemaFactory.createForClass(Trial);
