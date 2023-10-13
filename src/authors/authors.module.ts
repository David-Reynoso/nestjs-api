import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { DataService } from 'src/data/data.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, DataService],
})
export class AuthorsModule {}
