import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateTrialDto } from './dto';
import { UpdateTrialDto } from './dto';
import { Trial } from './entities/trial.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class TrialService {

    constructor(
        @InjectModel(Trial.name)
        private trialModel: Model<Trial>,) {
    }

    async create(createTrialDto: CreateTrialDto) {
        try {
            const newTrial = new this.trialModel({
                ...createTrialDto
            }
            );

            return await newTrial.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException(`${error} already exists!`)
            }
            throw new InternalServerErrorException('Something terrible happen!!!')
        }
    }

    findAll(): Promise<Trial[]> {
        return this.trialModel.find();
    }

    async findTrialById(id: string) {
        return await this.trialModel.findById(id);
    }

    async update(id: string, updateTrialDto: UpdateTrialDto) {
        const Trial = this.findTrialById(id);
        return this.trialModel.updateOne(Trial, updateTrialDto);
    }

    async remove(id: string) {
        const Trial = (await this.findTrialById(id)).toJSON();
        return this.trialModel.deleteOne(Trial);
    }

    async addTeamAssignated(id: string) {
        const Trial = await this.findTrialById(id)
        const { ...restBefore } = Trial.toJSON();
        Trial.teamsAssignated += 1;
        const { ...rest } = Trial.toJSON();
        return this.trialModel.updateOne(restBefore, rest)
    }

    async removeTeamAssignated(id: string) {
        const Trial = await this.findTrialById(id)
        const { ...restBefore } = Trial.toJSON();
        Trial.teamsAssignated = Trial.teamsAssignated - 1;
        const { ...rest } = Trial.toJSON();
        return this.trialModel.updateOne(restBefore, rest)
    }
}