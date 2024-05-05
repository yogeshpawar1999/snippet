import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from 'src/schemas/content.schema';
import { ContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
  ) {}

  async createContent(content: ContentDto) {
    const newContent = new this.contentModel(content);
    return newContent.save();
  }
}
