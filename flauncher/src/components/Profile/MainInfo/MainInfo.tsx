import style from "./style.module.css"
import {FC} from "react";
import {MainProfile} from "./MainProfileComponent/MainProfile.tsx";
import {CoinsComponent} from "./CoinsComponent/CoinsComponent.tsx";
import {SecurityComponent} from "./SecurityComponent/SecurityComponent.tsx";

export const MainInfo: FC = () => {
    return (<section className={style.mainInfo}>
        <MainProfile/>
        <CoinsComponent/>
        <SecurityComponent/>
    </section>)
}