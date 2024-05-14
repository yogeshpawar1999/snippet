import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateContentDto {
  
    @ApiProperty({ example: 'My Captivating News Title' })
    @IsString()
    title: string;
  
    @ApiProperty({ example: 'A detailed description of the news content.' })
    @IsString()
    description: string;
  
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    authorName: string;
  
    @ApiProperty({ example: 'path/to/image.jpg', required: false })
    @IsString()
    @IsOptional()
    contentImage?: string;
  
    @ApiProperty({ example: 'https://www.example.com/social-media', required: false })
    @IsUrl()
    @IsOptional()
    socialLink?: string;
  
    @ApiProperty({ example: 'draft' })
    @IsString()
    status: string;
  
    @ApiProperty({ example: 'johndoe@example.com' })
    @IsString()
    authorEmail: string;
  
    @ApiProperty({ example: 'The full content of the news article.', required: false })
    @IsString()
    fullNews: string;
  }
