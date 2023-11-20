import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DuoModule } from './duo/duo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_ATLAS_URL, {
      dbName: process.env.MONGO_DB_NAME
    }),
    AuthModule,
    DuoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
