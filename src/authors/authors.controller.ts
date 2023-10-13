import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    const authors = this.authorsService.findAll();
    if (authors.length === 0) {
      throw new NotFoundException('No authors found');
    }
    return authors;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const author = this.authorsService.findOne(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  @Post()
  create(@Body(new ValidationPipe()) authorData: { name: string }): Author {
    const { name } = authorData;
    return this.authorsService.create(name);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const author = this.authorsService.remove(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }
}
