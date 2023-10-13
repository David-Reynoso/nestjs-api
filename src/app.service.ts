import { Injectable } from '@nestjs/common';
import { AuthorsService } from './authors/authors.service';
import { BooksService } from './books/books.service';

@Injectable()
export class AppService {
  greeting() {
    return 'Hello BebeGurl!';
  }
}
