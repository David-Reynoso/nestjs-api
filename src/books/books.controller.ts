import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // GET all books with authors
  @Get()
  getAllBooksWithAuthors() {
    const books = this.booksService.getAll();
    if (books.length === 0) {
      throw new NotFoundException('Books Unavailable');
    }
    return books;
  }

  // GET all books
  @Get('only')
  getAllBooks() {
    const books = this.booksService.getAllBooks();
    if (books.length === 0) {
      throw new NotFoundException('There are no books found');
    }
    return books;
  }

  // GET all books by author
  @Get('/author/:authorId')
  getBooksByAuthor(@Param('authorId') authorId: string) {
    return this.booksService.getBooksByAuthor(+authorId);
  }

  // GET one book
  @Get(':id')
  getOneBook(@Param('id', ParseIntPipe) id: number) {
    const book = this.booksService.getOneBook(id);
    if (!book) {
      throw new NotFoundException(`Book not found`);
    }
    return book;
  }

  // CREATE a book
  @Post()
  async createBook(
    @Body(new ValidationPipe())
    bookData: {
      title: string;
      genre: string;
      description: string;
      authorName: string;
    },
  ): Promise<Book> {
    const { title, genre, description, authorName } = bookData;
    return await this.booksService.createBook(
      title,
      genre,
      description,
      authorName,
    );
  }

  // UPDATE a book
  @Put(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe())
    bookData: {
      title?: string;
      genre?: string;
      description?: string;
      authorName?: string;
    },
  ): Promise<Book> {
    const { title, genre, description, authorName } = bookData;
    return await this.booksService.update(
      id,
      title,
      genre,
      description,
      authorName,
    );
  }

  // DELETE a book
  @Delete(':id')
  removeBook(@Param('id', ParseIntPipe) id: number) {
    const book = this.booksService.deleteBook(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }
}
