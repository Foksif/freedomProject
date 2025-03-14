import React from "react";
import style from "./style.module.css"

const NewsBlock: React.FC = () => {
    return (<>
        <img className={style.vec} src="/Home/Vector.png" alt=""/>
        <img className={style.vec2} src="/Home/Vector-1.png" alt=""/>
    </>)
}

export default NewsBlock;