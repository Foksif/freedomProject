import React from "react";
import styles from "./NewsBlock.module.css";
import {useNews} from "../../../hooks/useNews.ts";
import {INews} from "../../../types/news.type.ts";

const placeholderImage = "https://i.pinimg.com/736x/7e/a1/90/7ea190a9e0f8caa40c88fdb3868ff15a.jpg";

const NewsBlock: React.FC = () => {
    const { data }  = useNews(placeholderImage)

    return (
        <div className={styles.newsContainer}>
            <div className={styles.newsList}>
                {data.map((news: INews) => (
                    <div key={news.id} className={styles.newsItem}>
                        {/*@ts-ignore*/}
                        <img src={news.img} alt="News" />
                        <div className={styles.newsItemDat}>
                            <div className={styles.newsItemHead}>
                                <h5>{news.category}</h5>
                                <p className={styles.newsDate}>{news.date}</p>
                            </div>
                            <h3 className={styles.newsItemTitle}>{news.title}</h3>
                            <p className={styles.newsItemContent}>{news.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsBlock;