import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  public books = [
    {
      id: 1,
      title: 'Nineteen Eighty-Four',
      genre: 'Dystopian',
      description:
        "It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
      authorId: 1,
    },
    {
      id: 2,
      title: 'The Great Gatsby',
      genre: 'Novel, Fiction, Drama, Tragedy',
      description:
        'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.',
      authorId: 2,
    },
    {
      id: 3,
      title: 'To Kill a Mockingbird',
      genre:
        ' Novel, Bildungsroman, Southern Gothic, Domestic Fiction, Thriller, Legal Story',
      description:
        'To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful.',
      authorId: 3,
    },
    {
      id: 4,
      title: 'Don Quixote',
      genre: 'Novel',
      description:
        'Don Quixote is a Spanish epic novel by Miguel de Cervantes. It was originally published in two parts, in 1605 and 1615.',
      authorId: 4,
    },
    {
      id: 5,
      title: 'Ang Palo ni Nanay',
      genre: 'Thriller, Horror',
      description: 'Palo sa umaga, palo sa gabi. Palo-palo ni nanay.',
      authorId: 5,
    },
    {
      id: 6,
      title: 'Cutting Class ni Pedro',
      genre: 'Mystery, Thriller',
      description:
        'Magpapaalam na mag CR lamang, ngunit ang di alam ng kanyang guro ay mag c-cutting class na pala ito.',
      authorId: 5,
    },
    {
      id: 7,
      title: 'Don Quixote',
      genre: 'Novel',
      description:
        'Don Quixote is a Spanish epic novel by Miguel de Cervantes. It was originally published in two parts, in 1605 and 1615.',
      authorId: 1,
    },
  ];
  public authors = [
    { id: 1, name: 'George Orwell' },
    { id: 2, name: 'F. Scott Fitzgerald' },
    { id: 3, name: 'Harper Lee' },
    { id: 4, name: 'Miguel de Cervantes' },
    { id: 5, name: 'David Reynoso' },
  ];
}
