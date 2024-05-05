import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { ContentDto } from './dto/create-content.dto';

@ApiTags('Content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a content',
  })
  async createContent(@Body() content: ContentDto) {
    return this.contentService.createContent(content);
  }
}
