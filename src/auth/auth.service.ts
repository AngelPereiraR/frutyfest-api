import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { CreateUserDto, RegisterDto, LoginDto, UpdateAuthDto } from './dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      }
      );

      await newUser.save();
      const { password: _, ...user } = newUser.toJSON();

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists!`)
      }
      throw new InternalServerErrorException('Something terrible happen!!!')
    }
  }

  async register(registerDto: RegisterDto): Promise<LoginResponse> {
    const user = await this.create(registerDto);
    await this.setAdmin(user._id);
    return {
      user: user,
      token: this.getJwtToken({ id: user._id })
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Not valid credentials - email');
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials - password');
    }

    const { password: _, ...rest } = user.toJSON();

    return {
      user: rest,
      token: this.getJwtToken({ id: user.id }),
    }

    /**
     * User { _id, name, email, roles }
     * Token -> ADJFAJD.ASJDJASDK.AKSDJADJ
     */
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    const { password, ...rest } = user.toJSON();
    return rest;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const user = this.findUserById(id);
    return this.userModel.updateOne(user, updateAuthDto);
  }

  async remove(id: string) {
    const user = await this.findUserById(id);

    return this.userModel.deleteOne(user); 
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private async setAdmin(id: string) {
    const user = await this.userModel.findById(id);
    const { ...restBefore } = user.toJSON();
    if (!user.roles.includes('admin') && (user.email === 'ampr2003@gmail.com' || user.email === 'drosterradiactive@gmail.com')) {
      user.roles.push('admin');
    }
    const { password, ...rest } = user.toJSON();
    return this.userModel.updateOne(restBefore, rest)
  }

  async setParticipant(id: string) {
    const user = await this.userModel.findById(id);
    const { ...restBefore } = user.toJSON();
    if (!user.roles.includes('participant')) {
      user.roles.push('participant');
    }
    const { password, ...rest } = user.toJSON();
    return this.userModel.updateOne(restBefore, rest)
  }

  async setSelectedOnTeam(id: string) {
    const user = await this.userModel.findById(id);
    const { ...restBefore } = user.toJSON();
    if (!user.roles.includes('onTeam')) {
      user.roles.push('onTeam');
    }
    const { password, ...rest } = user.toJSON();
    return this.userModel.updateOne(restBefore, rest)
  }

  async removeParticipant(id: string) {
    const user = await this.userModel.findById(id);
    const { ...restBefore } = user.toJSON();
    if (user.roles.includes('participant')) {
      user.roles.pop();
    }
    const { password, ...rest } = user.toJSON();
    return this.userModel.updateOne(restBefore, rest)
  }

  async removeSelectedOnTeam(id: string) {
    const user = await this.userModel.findById(id);
    const { ...restBefore } = user.toJSON();
    if (user.roles.includes('onTeam')) {
      user.roles.pop();
    }
    const { password, ...rest } = user.toJSON();
    return this.userModel.updateOne(restBefore, rest)
  }
}
