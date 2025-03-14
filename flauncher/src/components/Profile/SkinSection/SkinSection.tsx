import React from "react";
import style from "./style.module.css"
import MinecraftSkinViewer from "../../SkinsLib/MinecraftSkinViewer.tsx";

 export const SkinSection: React.FC = () => {
    return (<section className={style.skin_wrapper}>
        <div className={style.skin}>
            <MinecraftSkinViewer
                skinURL={"Skins/Foks_f.png"}
            />
        </div>
        <div className={style.button_wrapper}>
            <button className={style.button}>Загрузить скин</button>
            <button className={style.button}>Установить плащ</button>
        </div>
    </section>)
}
