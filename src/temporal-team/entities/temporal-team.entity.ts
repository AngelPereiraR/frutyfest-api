import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Trial } from "src/trial/entities/trial.entity";

@Schema()
export class TemporalTeam {

    _id?: string;

    @Prop({ type: [String], minlength: 1})
    teams: string[];

    @Prop({ required: true, unique: true })
    color: string;
    
    @Prop({ required: true })
    gamemode: Trial;

}

export const TemporalTeamSchema = SchemaFactory.createForClass(TemporalTeam);
