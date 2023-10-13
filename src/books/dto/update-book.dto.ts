import { PartialType } from '@nestjs/mapped-types';
import { Book } from './create-book.dto';

export class UpdateBookDto extends PartialType(Book) {}
