import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { TrialModule } from './trial/trial.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_ATLAS_URL, {
      dbName: process.env.MONGO_DB_NAME
    }),
    AuthModule,
    TeamModule,
    TrialModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
