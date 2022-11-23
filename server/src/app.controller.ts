import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Imgurl } from './types';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('imgs')
  async getImgUrl(@Body() message: Imgurl[]) {
    console.log(message);
    
  }
}
