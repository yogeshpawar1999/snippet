import { Injectable } from "@nestjs/common";
import { News, Prisma } from "@prisma/client";
import { CreateContentDto } from "./CreateContentDto.dto";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class AppRepo {
constructor(private prismaService:PrismaService){}

async createContent(createContentDto: Prisma.NewsCreateInput){
return this.prismaService.news.create({data:createContentDto})
}
}