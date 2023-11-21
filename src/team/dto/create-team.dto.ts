import { ArrayMinSize, IsArray, IsString, Length, Matches, MaxLength, Min, MinLength } from "class-validator";

export class CreateTeamDto {

    @IsString()
    @Length(7)
    @Matches('#[0-9 A-Z]{6}')
    color: string;

    @IsArray()
    @ArrayMinSize(2)
    @IsString({ each: true })
    @MinLength(24, {each: true})
    @MaxLength(24, {each: true})
    users: string[];

    @Min(0)
    totalPoints: number;
}
