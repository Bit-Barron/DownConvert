import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  [x: string]: any;
  getHello(): string {
    return 'Hello World!';
  }
}
