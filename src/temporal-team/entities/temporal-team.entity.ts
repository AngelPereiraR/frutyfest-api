import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TemporalTeam {

    _id?: string;

    @Prop({ type: [String], minlength: 1})
    teams: string[];

    @Prop({ required: true, unique: true })
    color: string;

}

export const TemporalTeamSchema = SchemaFactory.createForClass(TemporalTeam);
