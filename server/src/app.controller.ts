import { Body, Controller, Post, Res } from '@nestjs/common';
import axios from 'axios';
import { FastifyReply } from 'fastify';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import JSZip from 'jszip';
import path from 'path';
import sharp, { FormatEnum } from 'sharp';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('imgs')
  async getImgUrl(
    @Body() payload: { images: Image[]; format: string },
    @Res() reply: FastifyReply,
  ) {
    const { images, format } = payload;
    const imagePath = path.join(path.resolve(), 'images');
    fs.mkdirSync(imagePath, { recursive: true });

    const zip = new JSZip();

    // iterate for each image
    for (const image of images) {
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
          format
            ? (format as keyof FormatEnum)
            : (imageType as keyof FormatEnum),
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

  // Videos endpoint

  @Post('videos')
  async getVideoUrl(
    @Body() payload: { videos: Video[]; format: string },
    @Res() reply: FastifyReply,
  ) {
    const { videos, format } = payload;
    const outputFilename = `video.${format}`;
    const outputPath = path.join(__dirname, outputFilename);

    ffmpeg(videos)
      .format(format)
      .output(outputPath)
      .on('end', () => {
        const stream = fs.createReadStream(outputPath);
        reply
          .header('Content-Type', `video/${format}`)
          .header(
            'Content-Disposition',
            `attachment; filename=${outputFilename}`,
          )
          .send(stream);
      })
      .on('error', (err) => {
        console.log('Error during conversion:', err);
        reply.status(500).send('Error during video conversion');
      })
      .run();
  }
}
