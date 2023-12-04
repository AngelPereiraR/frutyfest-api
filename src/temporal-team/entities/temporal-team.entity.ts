import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Team } from "src/team/entities/team.entity";

@Schema()
export class TemporalTeam {

    _id?: string;

    @Prop({ type: [Team], minlength: 1})
    teams: Team[];

    @Prop({ required: true })
    color: string;

}

export const TemporalTeamSchema = SchemaFactory.createForClass(TemporalTeam);
