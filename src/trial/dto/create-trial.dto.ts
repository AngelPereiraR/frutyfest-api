import { IsBoolean, IsString, Min } from "class-validator";

export class CreateTrialDto {

    @IsString()
    name: string;

    @Min(1)
    maxPoints: number;

    @Min(1)
    pointsDecrease: number;

    @Min(1)
    maxTeams: number;

    @Min(1)
    phase: number;

    @IsBoolean()
    rated: boolean;

    @IsBoolean()
    beginningPhase: boolean;

    @IsBoolean()
    endingPhase: boolean;
}
