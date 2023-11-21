"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        try {
            const { password, ...userData } = createUserDto;
            const newUser = new this.userModel({
                password: bcryptjs.hashSync(password, 10),
                ...userData
            });
            await newUser.save();
            const { password: _, ...user } = newUser.toJSON();
            return user;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.BadRequestException(`${createUserDto.email} already exists!`);
            }
            throw new common_1.InternalServerErrorException('Something terrible happen!!!');
        }
    }
    async register(registerDto) {
        const user = await this.create(registerDto);
        return {
            user: user,
            token: this.getJwtToken({ id: user._id })
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Not valid credentials - email');
        }
        if (!bcryptjs.compareSync(password, user.password)) {
            throw new common_1.UnauthorizedException('Not valid credentials - password');
        }
        const { password: _, ...rest } = user.toJSON();
        return {
            user: rest,
            token: this.getJwtToken({ id: user.id }),
        };
    }
    findAll() {
        return this.userModel.find();
    }
    async findUserById(id) {
        const user = await this.userModel.findById(id);
        const { password, ...rest } = user.toJSON();
        return rest;
    }
    async update(id, updateAuthDto) {
        const user = this.findUserById(id);
        return this.userModel.updateOne(user, updateAuthDto);
    }
    async remove(id) {
        const user = this.findUserById(id);
        return this.userModel.deleteOne(user);
    }
    getJwtToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
    async setAdmin(id) {
        const user = await this.userModel.findById(id);
        const { ...restBefore } = user.toJSON();
        if (!user.roles.includes('admin')) {
            user.roles.push('admin');
        }
        const { password, ...rest } = user.toJSON();
        return this.userModel.updateOne(restBefore, rest);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map