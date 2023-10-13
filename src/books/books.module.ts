import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { AuthorsService } from 'src/authors/authors.service';
import { DataService } from 'src/data/data.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, AuthorsService, DataService],
})
export class BooksModule {}
