import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { News } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppService } from './app.service';
import { CreateContentDto } from './CreateContentDto.dto';

@Controller('content')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  // @UseInterceptors(FileInterceptor('contentImage'))
  @UseInterceptors(
    FileInterceptor('contentImage', {
      storage: diskStorage({
        destination: './uploads', // Change this to your desired storage location
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() contentImage: Express.Multer.File,
    @Body() createContentDto: CreateContentDto,
    @Res() res,
  ): Promise<News> {
    try {
      console.log('file.path', contentImage);

      if (!contentImage) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Please upload an image' });
      }

      const imageUrl = `/uploads/${contentImage.filename}`;
      console.log('imageUrl', imageUrl);

      createContentDto.contentImage = contentImage.path;
      await this.appService.createContent(createContentDto);
      return res
          .status(HttpStatus.CREATED)
          .send({status: HttpStatus.CREATED, message: 'Content created successfully' });
    } catch (err) {
      console.log('err', err);
      throw err;
    }
  }
}
