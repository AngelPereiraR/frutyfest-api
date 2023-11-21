/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose" />
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateAuthDto, LoginDto, RegisterDto } from './dto';
import { User } from './entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<import("./interfaces/login-response").LoginResponse>;
    register(registerDto: RegisterDto): Promise<import("./interfaces/login-response").LoginResponse>;
    findAll(): Promise<User[]>;
    checkToken(req: Request): {
        user: User;
        token: string;
    };
    findOne(id: string): Promise<{
        _id: string;
        email: string;
        name: string;
        roles: string[];
    }>;
    update(id: string, updateAuthDto: UpdateAuthDto): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
    setAdmin(id: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
