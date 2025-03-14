import { PrismaService } from "@prisma/prisma.service";
import { CreateNewsDto, UpdateNewsDto } from "./dto";
export declare class NewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createNewsDto: CreateNewsDto): Promise<{
        id: number;
        title: string;
        content: string;
        image: string | null;
        date: Date;
        category: string;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        content: string;
        image: string | null;
        date: Date;
        category: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        image: string | null;
        date: Date;
        category: string;
    } | null>;
    update(id: number, updateNewsDto: UpdateNewsDto): Promise<{
        id: number;
        title: string;
        content: string;
        image: string | null;
        date: Date;
        category: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        image: string | null;
        date: Date;
        category: string;
    }>;
}
