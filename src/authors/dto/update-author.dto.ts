import { PartialType } from '@nestjs/mapped-types';
import { Author } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(Author) {}
