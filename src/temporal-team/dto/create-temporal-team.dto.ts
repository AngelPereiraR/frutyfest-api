import { ArrayMinSize, IsArray, IsString, Length, Matches } from "class-validator";

export class CreateTemporalTeamDto {

    @IsString()
    @Length(7)
    @Matches('#[0-9 A-Z a-z]{6}')
    color: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    teams: string[];

    @IsString()
    gamemode: string
}
