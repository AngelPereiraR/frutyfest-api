import { ArrayMinSize, IsArray, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateTemporalTeamDto {

    @IsString()
    @Length(7)
    @Matches('#[0-9 A-Z]{6}')
    color: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @MinLength(24, {each: true})
    @MaxLength(24, {each: true})
    teams: string[];
}
