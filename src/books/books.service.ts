import { Injectable } from '@nestjs/common';
import { Book } from './dto/create-book.dto';
import { AuthorsService } from '../authors/authors.service';
import { DataService } from 'src/data/data.service';

@Injectable()
export class BooksService {
  constructor(
    private authorsService: AuthorsService,
    private dataService: DataService,
  ) {}

  private currentId = 1;
  generateUniqueId() {
    // Generate a unique ID by incrementing the current ID and checking for uniqueness
    let newId = this.currentId;
    while (this.dataService.books.some((book) => book.id === newId)) {
      newId++;
    }
    this.currentId = newId;
    return newId;
  }

  // GET ALL BOOKS WITH AUTHOR INFO
  getAll() {
    const books = this.dataService.books;
    const booksWithAuthorInfo = books.map((book) => {
      const author = this.authorsService.findOne(book.authorId);
      const { authorId, ...rest } = book;
      if (!author) {
        return {
          ...rest,
          authorName: 'No author found',
        };
      } else {
        return {
          ...rest,
          authorName: author.name,
        };
      }
    });
    return booksWithAuthorInfo;
  }

  // GET ALL BOOKS
  getAllBooks() {
    // Get all books but don't include authorId
    const books = this.dataService.books.map(({ authorId, ...rest }) => rest);
    return books;
  }

  // GET ALL BOOKS BY AUTHOR
  getBooksByAuthor(authorId: number) {
    const books = this.dataService.books.filter(
      (book) => book.authorId === authorId,
    );
    const booksWithAuthorName = books.map((book) => {
      const author = this.authorsService.findOne(book.authorId);
      const { authorId, ...rest } = book;
      if (!author) {
        return {
          ...rest,
          authorName: 'No author found',
        };
      } else {
        return {
          ...rest,
          authorName: author.name,
        };
      }
    });
    return booksWithAuthorName;
  }

  getOneBook(id: number) {
    // GET ONE BOOK dont include authorId but include authorName
    const book = this.dataService.books.find((book) => book.id === id);
    if (!book) {
      return null;
    }
    const { authorId, ...rest } = book;
    const author = this.authorsService.findOne(authorId);
    if (!author) {
      return {
        ...rest,
        authorName: 'No author found',
      };
    }
    return {
      ...rest,
      authorName: author.name,
    };
  }

  // CREATE A BOOK
  async createBook(
    title: string,
    genre: string,
    description: string,
    authorName: string,
  ): Promise<Book> {
    const existingAuthor =
      await this.authorsService.findAuthorByName(authorName);

    if (existingAuthor) {
      return this.createBookWithAuthorId(
        title,
        genre,
        description,
        existingAuthor.id,
      );
    } else {
      const newAuthor = await this.authorsService.create(authorName);
      return this.createBookWithAuthorId(
        title,
        genre,
        description,
        newAuthor.id,
      );
    }
  }
  private createBookWithAuthorId(
    title: string,
    genre: string,
    description: string,
    authorId: number,
  ) {
    const newBook: Book = {
      id: this.generateUniqueId(),
      title,
      genre,
      description,
      authorId,
    };
    this.dataService.books.push(newBook);
    return newBook;
  }

  // UPDATE A BOOK
  async update(
    bookId: number,
    title: string,
    genre: string,
    description: string,
    authorName: string,
  ): Promise<Book> {
    const book = this.dataService.books.find((book) => book.id === bookId);

    if (!book) {
      return null;
    }
    // Update title, genre, and description
    if (title) {
      book.title = title;
    }
    if (genre) {
      book.genre = genre;
    }
    if (description) {
      book.description = description;
    }

    // Check if the author name has changed
    if (authorName) {
      // Try to find the author by name
      const existingAuthor =
        await this.authorsService.findAuthorByName(authorName);
      if (existingAuthor) {
        // If an author with the same name exists, update the authorId
        book.authorId = existingAuthor.id;
      } else {
        // If no matching author is found, create a new author
        const newAuthor = await this.authorsService.create(authorName);
        book.authorId = newAuthor.id;
      }
    } else {
      // If no author name is provided, use the existing authorId
      book.authorId = book.authorId;
    }
    return book;
  }

  // DELETE A BOOK
  deleteBook(id: number) {
    const book = this.getOneBook(id);
    this.dataService.books = this.dataService.books.filter(
      (book) => book.id !== id,
    );
    return book;
  }
}
