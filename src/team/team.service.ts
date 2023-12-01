import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateTeamDto } from './dto';
import { UpdateTeamDto } from './dto';
import { Team } from './entities/team.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class TeamService {

    constructor(
        @InjectModel(Team.name)
        private teamModel: Model<Team>,) {
    }

    async create(createTeamDto: CreateTeamDto) {
        try {
            const newTeam = new this.teamModel({
                ...createTeamDto
            }
            );

            return await newTeam.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException(`${createTeamDto.color} already exists!`)
            }
            throw new InternalServerErrorException('Something terrible happen!!!')
        }
    }

    findAll(): Promise<Team[]> {
        return this.teamModel.find();
    }

    async findTeamById(id: string) {
        return await this.teamModel.findById(id);
    }

    async update(id: string, updateTeamDto: UpdateTeamDto) {
        const Team = this.findTeamById(id);
        return this.teamModel.updateOne(Team, updateTeamDto);
    }

    async remove(id: string) {
        const Team = (await this.findTeamById(id)).toJSON();
        return this.teamModel.deleteOne(Team);
    }
}