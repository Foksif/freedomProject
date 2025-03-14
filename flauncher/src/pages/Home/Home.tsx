import style from "./style.module.css"
import NewsBlock from "../../components/Home/NewsComponent/NewsBlock.tsx";
import LaunchButton from "../../components/Home/LaunchButton/LaunchButton.tsx";
import Vector from "../../components/Home/Vectors/Vector.tsx";


export const Home = () => {
    return <main>
        <Vector/>
        <img className={style.art} src="/Home/art.png" alt=""/>
        <NewsBlock/>
        <div className={style.launch}>
            <LaunchButton/>
        </div>
    </main>
}