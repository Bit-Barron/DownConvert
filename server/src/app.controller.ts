import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ExampleDto } from './types';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('imgs')
  getImgUrl(@Body() message: ExampleDto) {
    console.log(message);
    return message;
  }
}
