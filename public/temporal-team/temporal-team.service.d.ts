/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
import { CreateTemporalTeamDto } from './dto';
import { UpdateTemporalTeamDto } from './dto';
import { TemporalTeam } from './entities/temporal-team.entity';
import { Model } from 'mongoose';
export declare class TemporalTeamService {
    private temporalteamModel;
    constructor(temporalteamModel: Model<TemporalTeam>);
    create(createTemporalTeamDto: CreateTemporalTeamDto): Promise<import("mongoose").Document<unknown, {}, TemporalTeam> & TemporalTeam & Required<{
        _id: string;
    }>>;
    findAll(): Promise<TemporalTeam[]>;
    findTemporalTeamById(id: string): Promise<import("mongoose").Document<unknown, {}, TemporalTeam> & TemporalTeam & Required<{
        _id: string;
    }>>;
    update(id: string, updateTemporalTeamDto: UpdateTemporalTeamDto): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
