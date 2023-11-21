import { Module } from '@nestjs/common';
import { TemporalTeamService } from './temporal-team.service';
import { TemporalTeamController } from './temporal-team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TemporalTeam, TemporalTeamSchema } from './entities/temporal-team.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [TemporalTeamController],
  providers: [TemporalTeamService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: TemporalTeam.name,
        schema: TemporalTeamSchema
      }
    ])
  ],
})
export class TemporalTeamModule { }
