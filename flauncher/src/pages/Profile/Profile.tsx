import style from './style.module.css'
import {SkinSection} from "../../components/Profile/SkinSection/SkinSection.tsx";
import {MainInfo} from "../../components/Profile/MainInfo/MainInfo.tsx";

export const Profile = () => {
    return <>
        <img className={style.vector} src="/Profile/Vector.png" alt=""/>
        <MainInfo />
        <img className={style.art} src="Profile/art.png" alt=""/>
        <SkinSection/>

    </>
}