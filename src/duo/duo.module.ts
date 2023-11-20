import { Module } from '@nestjs/common';
import { DuoService } from './duo.service';
import { DuoController } from './duo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Duo, DuoSchema } from './entities/duo.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [DuoController],
  providers: [DuoService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Duo.name,
        schema: DuoSchema
      }
    ])
  ],
})
export class DuoModule { }
