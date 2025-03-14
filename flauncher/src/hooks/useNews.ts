import {useQuery} from "@tanstack/react-query";
import {INews} from "../types/news.type.ts";
import {newsService} from "../services/news.service.ts";

const initialData: {data: INews[]} = {
    data: [
        {
            id: 0,
            title: "Ooooops...",
            category: "информация",
            content: "Похоже что что-то пошло не так...",
            date: "30.04.1945",
        },
    ],
}

export function useNews(placeholderImage: string) {
    const { data } = useQuery({
        queryKey: ['news'],
        queryFn: newsService.getNews,
        select: data => data.data.map((news: any):INews => (
            {
                id: news.id,
                img: news.image ? news.image : placeholderImage,
                category: news.category,
                date: new Date(news.date).toLocaleDateString(),
                title: news.title,
                content: news.content,
            })).reverse(),
        enabled: true,
        initialData
    })

    return { data }
}