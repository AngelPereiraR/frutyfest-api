import { ArrayMinSize, IsArray, IsObject, IsString, Length, Matches } from "class-validator";
import { Team } from "src/team/entities/team.entity";

export class CreateTemporalTeamDto {

    @IsString()
    @Length(7)
    @Matches('#[0-9 A-Z a-z]{6}')
    color: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsObject({ each: true })
    teams: Team[];
}
