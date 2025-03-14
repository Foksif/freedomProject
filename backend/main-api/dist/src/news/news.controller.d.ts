import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto";
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
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
    findOne(id: string): Promise<{
        id: number;
        title: string;
        content: string;
        image: string | null;
        date: Date;
        category: string;
    } | null>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        content: string;
        image: string | null;
        date: Date;
        category: string;
    }>;
}
