import { IsNotEmpty, MinLength } from 'class-validator';

export class Book {
  id: number;

  @MinLength(4)
  title: string;

  genre: string;
  description: string;

  @IsNotEmpty()
  authorId: number;
}

// "title": "",
// "genre": "",
// "description": "",
// "authorName": ""
