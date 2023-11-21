import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Team } from "src/team/entities/team.entity";

@Schema()
export class TemporalTeam {

    _id?: string;

    @Prop({ type: [Team], minlength: 2})
    duos: Team[];

    @Prop({ required: true, unique: true })
    color: string;

}

export const TemporalTeamSchema = SchemaFactory.createForClass(TemporalTeam);
