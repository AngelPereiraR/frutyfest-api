import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateAuthDto, LoginDto, RegisterDto } from './dto'
import { AuthGuard } from './guards/auth.guard';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/check-token')
  checkToken(@Request() req: Request) {
    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id })
    }

  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findUserById(id);
  }

  @Get('/email/:email')
  findOneByUser(@Param('email') email: string) {
    return this.authService.findUserByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Patch('/changePassword/:id')
  changePassword(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.changePassword(id, updateAuthDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/setParticipant/:id')
  setParticipant(@Param('id') id: string) {
    return this.authService.setParticipant(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/removeParticipant/:id')
  removeParticipant(@Param('id') id: string) {
    return this.authService.removeParticipant(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/setAlternate/:id')
  setAlternate(@Param('id') id: string) {
    return this.authService.setAlternate(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/removeAlternate/:id')
  removeAlternate(@Param('id') id: string) {
    return this.authService.removeAlternate(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/setSelectedOnTeam/:id')
  setSelectedOnTeam(@Param('id') id: string) {
    return this.authService.setSelectedOnTeam(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/removeSelectedOnTeam/:id')
  removeSelectedOnTeam(@Param('id') id: string) {
    return this.authService.removeSelectedOnTeam(id);
  }
}
