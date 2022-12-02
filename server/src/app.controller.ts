import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import Axios from 'axios';
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
  async getImgUrl(@Body() images: Image[]) {
    const imagePath = path.join(path.resolve(), 'images');
    fs.mkdirSync(imagePath, { recursive: true });

    for (const image of images) {
      const name = new URL(image.url).pathname.split('/').slice(-1)[0];
      const imageType = image.headers
        .find((header) => header.name.toLowerCase() === 'content-type')
        ?.value.replace('image/', '');
      const fileName = `${name}.${imageType}`;

      const response = await axios.get(image.url, { responseType: 'stream' });
      response.data.pipe(fs.createWriteStream(path.join(imagePath, fileName)));
    }

    return '';
  }
}
