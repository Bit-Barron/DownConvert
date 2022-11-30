import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Imgurl } from './types';
import * as fs from 'fs';
import * as Path from 'path';
import Axios from 'axios';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    const x = 12;
  }

  @Post('imgs')
  async getImgUrl(@Body() images: Imgurl[]) {
    for (let image of images) {
      const url = image.url;
      const path = Path.resolve(__dirname, 'image.jpg');
      const response = await Axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
      });
      response.data.pipe(fs.createWriteStream(path));
      return new Promise<void>((resolve, reject) => {
        response.data.on('end', () => {
          resolve();
        });

        response.data.on('error', (err) => {
          reject(err);
        });

        console.log(images);
      });
    }
  }
}


