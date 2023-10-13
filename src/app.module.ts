import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { AuthorsService } from './authors/authors.service';
import { BooksService } from './books/books.service';
import { DataService } from './data/data.service';
import { AuthorsController } from './authors/authors.controller';
import { BooksController } from './books/books.controller';

@Module({
  imports: [BooksModule, AuthorsModule],
  controllers: [AppController, AuthorsController, BooksController],
  providers: [AppService, AuthorsService, BooksService, DataService],
})
export class AppModule {}
