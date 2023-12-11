import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateTemporalTeamDto } from './dto';
import { UpdateTemporalTeamDto } from './dto';
import { TemporalTeam } from './entities/temporal-team.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class TemporalTeamService {

    constructor(
        @InjectModel(TemporalTeam.name)
        private temporalteamModel: Model<TemporalTeam>,) {
    }

    async create(createTemporalTeamDto: CreateTemporalTeamDto) {
        // try {
            
        // } catch (error) {
        //     if (error.code === 11000) {
        //         throw new BadRequestException(`Team/s already asignated!`)
        //     }
        //     throw new InternalServerErrorException('Something terrible happen!!!')
        // }

        const newTemporalTeam = new this.temporalteamModel({
            ...createTemporalTeamDto
        }
        );

        return await newTemporalTeam.save();
    }

    findAll(): Promise<TemporalTeam[]> {
        return this.temporalteamModel.find();
    }

    async findTemporalTeamById(id: string) {
        return await this.temporalteamModel.findById(id);
    }

    async update(id: string, updateTemporalTeamDto: UpdateTemporalTeamDto) {
        const TemporalTeam = this.findTemporalTeamById(id);
        return this.temporalteamModel.updateOne(TemporalTeam, updateTemporalTeamDto);
    }

    async remove(id: string) {
        const TemporalTeam = ((await this.findTemporalTeamById(id)).toJSON());
        return this.temporalteamModel.deleteOne(TemporalTeam);
    }
}