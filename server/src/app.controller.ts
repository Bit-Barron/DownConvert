import { Body, Controller, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp, { FormatEnum } from 'sharp';
import JSZip from 'jszip';
import { FastifyReply } from 'fastify';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('imgs')
  async getImgUrl(
    @Body() payload: { images: Image[]; format: string;},
    @Res() reply: FastifyReply,
  ) {
    const { images, format } = payload;
    const imagePath = path.join(path.resolve(), 'images');
    fs.mkdirSync(imagePath, { recursive: true });

    const zip = new JSZip();


    // iterate for each image
    for (const image of images) {
      console.log(image)
      const name = new URL(image.url).pathname.split('/').slice(-1)[0];
      const imageType = image.headers
      ?.find((header) => header.name.toLowerCase() === 'content-type')
      ?.value.replace('image/', '');


      const response = await axios.get(image.url, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(response.data, 'binary');

      const resizedImage = await sharp(imageBuffer)
        .toFormat(
          format ? (format as keyof FormatEnum) : (imageType as keyof FormatEnum),
        )
        .toBuffer();
      zip.file(`${name}.${format || imageType}`, resizedImage); // Add image to zip
    }

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    const zipFileName = path.join(imagePath, `images.zip`);

    fs.writeFileSync(zipFileName, zipBuffer);

    reply
      .header('Content-Type', 'application/zip')
      .header('Content-Disposition', `attachment; filename=images.zip`)
      .send(zipBuffer);

    return zipFileName;
  }
  @Post('videos')
  async getVideoUrl(@Body() payload: { videos: Video[]; type: string }) {
    const { videos, type } = payload;

  }
}
