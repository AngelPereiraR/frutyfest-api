import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './entities/team.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamSchema
      }
    ])
  ],
})
export class TeamModule { }
