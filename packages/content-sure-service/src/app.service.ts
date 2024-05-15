import { Injectable } from '@nestjs/common';
import { AppRepo } from './app.repo';
import { CreateContentDto } from './CreateContentDto.dto';

@Injectable()
export class AppService {
  constructor(private appRepo: AppRepo) {}
  getHello(): string {
    return 'Hello World!';
  }

  createContent(createContentDto: CreateContentDto) {
    return this.appRepo.createContent({
      ...createContentDto,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
  }

  getAllPosts() {
    return this.appRepo.getAllPosts();
  }

  updateContent(id: number, createContentDto: CreateContentDto) {
    return this.appRepo.updateContent(id, createContentDto);
  }
}
