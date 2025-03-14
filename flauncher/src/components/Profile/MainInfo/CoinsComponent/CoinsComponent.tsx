import {FC} from "react";
import style from "./style.module.css";

export const CoinsComponent: FC = () => {
    return (<section className={style.coins}>
        <h1>Ваш баланс</h1>
        <div className={style.coins_content}>
            <h1>Койнов: 0</h1>
            <button>Пополнить баланс</button>
        </div>
    </section>)
}