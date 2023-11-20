import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateDuoDto } from './dto';
import { UpdateDuoDto } from './dto';
import { Duo } from './entities/duo.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class DuoService {

    constructor(
        @InjectModel(Duo.name)
        private duoModel: Model<Duo>,) {
    }

    async create(createDuoDto: CreateDuoDto) {
        try {
            const newDuo = new this.duoModel({
                ...createDuoDto
            }
            );

            return await newDuo.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException(`${createDuoDto.color} already exists!`)
            }
            throw new InternalServerErrorException('Something terrible happen!!!')
        }
    }

    findAll(): Promise<Duo[]> {
        return this.duoModel.find();
    }

    async findDuoById(id: string) {
        return await this.duoModel.findById(id);
    }

    async update(id: string, updateDuoDto: UpdateDuoDto) {
        const duo = this.findDuoById(id);
        return this.duoModel.updateOne(duo, updateDuoDto);
    }

    async remove(id: string) {
        const duo = this.findDuoById(id);
        return this.duoModel.deleteOne(duo);
    }
}