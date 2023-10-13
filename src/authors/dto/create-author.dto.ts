import { IsString, MinLength } from 'class-validator';

export class Author {
  id: number;

  @IsString()
  @MinLength(4)
  name: string;
}
