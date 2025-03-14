import {FC} from "react";
import style from "./style.module.css";

export const SecurityComponent: FC = () => {
    return (<section className={style.security}>
        <h1>Безопастность</h1>
        <div className={style.security_email}>
            <h1>Почта</h1>
            <p>contact@foksik.ovh</p>
        </div>
        <div className={style.line}></div>
        <div className={style.security_password}>
            <h1>Пароль</h1>
            <button>Изменить</button>
        </div>
    </section>)
}