import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { CreateUserDto, RegisterDto, LoginDto, UpdateAuthDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private client = require("@sendgrid/mail");
  private readonly apiKey: string;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    this.client.setApiKey(this.apiKey);
  }

  async sendEmail(to: string, subject: string, htmlContent: string): Promise<void> {
    const msg = {
      to,
      from: `FrutyFest <${process.env.USER}>`,
      subject,
      html: htmlContent,
    };

    await this.client
      .send(msg)
      .then(() => console.log('Mail sent successfully'))
      .catch((error: any) => {
        console.error(error);
      });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {

    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      }
      );

      await this.sendEmail(userData.email, "Credenciales del registro en FrutyFest", `<h3>Bienvenid@ ${userData.name}, tus credenciales son las siguientes:</h3>\n\n<p>Usuario: ${userData.email}</p>\n<p>Contraseña: ${password}</p>\n\n\n<p>Estás pendiente de ser seleccionado como uno de los participantes del FrutyFest</p>`);
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

  async findUserByEmail(email: string) {
    const user = this.userModel.findOne({ email }).exec();
    const { password, ...rest } = (await user).toJSON();
    return rest;
  }

  async changePassword(id: string, updateAuthDto: UpdateAuthDto) {

    const user = await this.userModel.findById(id);
    const { password, ...userData } = updateAuthDto;

    const changeUser = user;

    changeUser.password = bcryptjs.hashSync(password, 10);

    await this.sendEmail(updateAuthDto.email, "Nuevas credenciales del registro en FrutyFest", `<h3>Bienvenid@ ${updateAuthDto.name}, tus nuevas credenciales son las siguientes:</h3>\n\n<p>Usuario: ${updateAuthDto.email}</p>\n<p>Contraseña: ${updateAuthDto.password}</p>`);

    changeUser.save();

    return changeUser.toJSON();
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {

    const user = await this.userModel.findById(id);
    const { password, ...userData } = updateAuthDto;

    const changeUser = user;

    changeUser.email = userData.email;
    changeUser.name = userData.name;
    changeUser.minecraftName = userData.minecraftName;
    changeUser.hasCompanion = userData.hasCompanion;
    changeUser.companionName = userData.companionName;
    changeUser.event = userData.event;
    changeUser.presentation = userData.presentation;

    changeUser.save();

    return changeUser.toJSON();
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
    if (!user.roles.includes('admin') && (user.email === 'ampr2003@gmail.com' || user.email === 'pmcortado2000@gmail.com' || user.email === 'daniel.ramos.sanchez@gmail.com')) {
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

  async setAlternate(id: string) {
    const user = await this.userModel.findById(id);
    const { ...restBefore } = user.toJSON();
    if (!user.roles.includes('alternate')) {
      user.roles.push('alternate');
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

  async removeAlternate(id: string) {
    const user = await this.userModel.findById(id);
    const { ...restBefore } = user.toJSON();
    if (user.roles.includes('alternate')) {
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
