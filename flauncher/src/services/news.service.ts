import axios from "axios";
import {INews} from "../types/news.type.ts";
import {apiConfig} from "../configs/api.config.ts";

class NewsService {
    getNews() {
        return axios.get<INews[]>(`${apiConfig.baseURL}/news`);
    }
}

export const newsService = new NewsService();