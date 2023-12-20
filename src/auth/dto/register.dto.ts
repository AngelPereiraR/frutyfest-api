import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string;
    @IsString()
    name: string;
    @MinLength(6)
    password: string;
    @IsBoolean()
    hasCompanion: boolean;
    @IsString()
    companionName?: string;
    @IsString()
    event: string;
    @IsString()
    presentation: string;
}
