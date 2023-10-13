import { Injectable } from '@nestjs/common';
import { Author } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { DataService } from 'src/data/data.service';

@Injectable()
export class AuthorsService {
  constructor(private dataService: DataService) {}

  private currentId = 1;
  generateUniqueId() {
    let newId = this.currentId;
    while (this.dataService.authors.some((author) => author.id === newId)) {
      newId++;
    }

    this.currentId = newId;
    return newId;
  }

  findAll() {
    const authors = this.dataService.authors;
    return authors;
  }

  findOne(id: number) {
    const author = this.dataService.authors.find((author) => author.id === id);
    return author;
  }

  create(name: string): Author {
    const newAuthor: Author = {
      id: this.generateUniqueId(),
      name,
    };
    this.dataService.authors.push(newAuthor);
    return newAuthor;
  }

  findAuthorByName(name: string): Author | undefined {
    return this.dataService.authors.find((author) => author.name === name);
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = this.dataService.authors.find((author) => author.id === id);
    Object.assign(author, updateAuthorDto);
    return author;
  }

  remove(id: number) {
    const author = this.dataService.authors.find((author) => author.id === id);
    this.dataService.authors = this.dataService.authors.filter(
      (author) => author.id !== id,
    );
    return author;
  }
}
