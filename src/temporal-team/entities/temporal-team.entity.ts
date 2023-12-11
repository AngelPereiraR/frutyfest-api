import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Team } from "src/team/entities/team.entity";

@Schema()
export class TemporalTeam {

    _id?: string;

    @Prop({ type: [String], minlength: 1})
    teams: string[];

    @Prop({ required: true, unique: true })
    color: string;

}

export const TemporalTeamSchema = SchemaFactory.createForClass(TemporalTeam);
