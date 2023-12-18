import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Team } from "src/team/entities/team.entity";
import { Trial } from "src/trial/entities/trial.entity";

@Schema()
export class TemporalTeam {

    _id?: string;

    @Prop({ type: [String], minlength: 1})
    teams: string[];

    @Prop({ required: true, unique: true })
    color: string;
    
    @Prop({ required: true, unique: true })
    gamemode: string;

}

export const TemporalTeamSchema = SchemaFactory.createForClass(TemporalTeam);
