import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  greeting() {
    return 'Hello BebeGurl!';
  }
}
