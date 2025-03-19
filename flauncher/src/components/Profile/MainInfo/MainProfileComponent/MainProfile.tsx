import {FC} from "react";
import style from "./style.module.css";
import {useProfile} from "../../../../hooks/useProfile.ts";

const placeholderImage: string = "https://i.pinimg.com/736x/7e/a1/90/7ea190a9e0f8caa40c88fdb3868ff15a.jpg";
export const MainProfile: FC = () => {
    const { data } = useProfile()
    if (!data) {
        return <p>Загрузка...</p>;
    }
    const roleNames: Record<string, string> = {
        USER: "Игрок",
        MODERATOR: "Модерватор",
        ADMIN: "Админ",
    };

    const date = new Date(data?.createdAt);
    const formattedDate = `${String(date.getUTCDate()).padStart(2, "0")}.${String(date.getUTCMonth() + 1).padStart(2, "0")}.${date.getUTCFullYear()}`;

    return ( <section className={style.main_profile}>
        <img src={placeholderImage} alt=""/>
        <div className={style.profile_content}>
            <p>{data?.roles?.map(role => roleNames[role] || role).join(", ")}</p>
            <h1>{data?.name}</h1>
            <div className={style.badge_wrapper}>
                <div className={style.profile_badge} ></div>
                <div className={style.profile_badge} ></div>
            </div>
            <h2>Зарегался: {formattedDate}</h2>
            <button>Установить аватарку</button>
        </div>
    </section>)
}