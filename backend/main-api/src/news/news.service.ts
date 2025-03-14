import { Injectable } from '@nestjs/common';
import {PrismaService} from "@prisma/prisma.service";
import {CreateNewsDto, UpdateNewsDto} from "./dto";


@Injectable()
export class NewsService {
    constructor( private readonly prisma: PrismaService) {}

    async create(createNewsDto: CreateNewsDto) {
        return this.prisma.news.create({
            data: createNewsDto,
        });
    }

    async findAll() {
        return this.prisma.news.findMany();
    }

    async findOne(id: number) {
        return this.prisma.news.findUnique({
            where: { id },
        });
    }

    async update(id: number, updateNewsDto: UpdateNewsDto) {
        return this.prisma.news.update({
            where: { id },
            data: updateNewsDto,
        });
    }

    async remove(id: number) {
        return this.prisma.news.delete({
            where: { id },
        });
    }
}
