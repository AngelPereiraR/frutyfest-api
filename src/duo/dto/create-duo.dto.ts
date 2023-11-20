import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, Min, MinLength } from "class-validator";
import { User } from "src/auth/entities/user.entity";

export class CreateDuoDto {

    @IsString()
    @MinLength(2)
    color: string;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    users: User[];

    @Min(0)
    totalPoints: number;
}
