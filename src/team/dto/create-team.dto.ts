import { ArrayMinSize, IsArray, IsObject, IsString, Length, Matches, Min } from "class-validator";
import { User } from "src/auth/entities/user.entity";

export class CreateTeamDto {

    @IsString()
    @Length(7)
    @Matches('#[0-9 A-Z a-z]{6}')
    color: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsObject({ each: true })
    users: User[];

    @IsString()
    event: string;

    @IsString()
    name: string;

    @Min(0)
    totalPoints: number;

    @IsArray()
    @ArrayMinSize(0)
    roles: string[];
}
