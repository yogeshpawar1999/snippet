import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppRepo {
  constructor(private prismaService: PrismaService) {}

  async createContent(createContentDto: Prisma.NewsCreateInput) {
    return this.prismaService.news.create({ data: createContentDto });
  }

  async getAllPosts() {
    return this.prismaService.news.findMany();
  }

  async updateContent(id: number, createContentDto: Prisma.NewsCreateInput) {
    return this.prismaService.news.update({
      where: { id },
      data: createContentDto,
    });
  }
}
