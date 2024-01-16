import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto';
import { UpdateTeamDto } from './dto';
import { Team } from './entities/team.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private teamModel: Model<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
      const newTeam = new this.teamModel({
        ...createTeamDto,
      });

      return await newTeam.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`User/s already asignated!`);
      }
      throw new InternalServerErrorException('Something terrible happen!!!');
    }
  }

  findAll(): Promise<Team[]> {
    return this.teamModel.find();
  }

  async findTeamById(id: string) {
    return await this.teamModel.findById(id);
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const team = await this.teamModel.findById(id);
    const { ...teamData } = updateTeamDto;

    const changeTeam = team;

    changeTeam.totalPoints = teamData.totalPoints;

    changeTeam.save();

    return changeTeam.toJSON();
  }

  async remove(id: string) {
    const Team = (await this.findTeamById(id)).toJSON();
    return this.teamModel.deleteOne(Team);
  }
}
