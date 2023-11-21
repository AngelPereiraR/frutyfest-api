import { Module } from '@nestjs/common';
import { TrialService } from './trial.service';
import { TrialController } from './trial.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trial, TrialSchema } from './entities/trial.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [TrialController],
  providers: [TrialService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Trial.name,
        schema: TrialSchema
      }
    ])
  ],
})
export class TrialModule { }
