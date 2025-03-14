import {FC} from "react";
import style from "./style.module.css";

const placeholderImage: string = "https://i.pinimg.com/736x/7e/a1/90/7ea190a9e0f8caa40c88fdb3868ff15a.jpg";
export const MainProfile: FC = () => {
    return ( <section className={style.main_profile}>
        <img src={placeholderImage} alt=""/>
        <div className={style.profile_content}>
            <p>Игрок</p>
            <h1>foksik</h1>
            <div className={style.badge_wrapper}>
                <div className={style.profile_badge} ></div>
                <div className={style.profile_badge} ></div>
            </div>
            <h2>Статус: NAN</h2>
            <button>Установить аватарку</button>
        </div>
    </section>)
}