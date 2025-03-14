import React from "react";
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {toast} from "react-toastify";

import style from "./style.module.css"

const LaunchButton: React.FC = () => {
    const [status, setStatus] = useState("Начать игру");
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    const checkGamePath = async () => {
        try {
            const existsFile: boolean = await invoke('check_file_exists');
            setIsButtonVisible(existsFile);
        } catch (error) {
            console.error("Error checking file:", error);
        }
    };

    useEffect(() => {
        checkGamePath();

        // Проверка файлов игры каждые 3 секунды
        const intervalId = setInterval(() => {
            checkGamePath();
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const runMinecraft = async () => {
        setStatus("Запуск...");
        // toast.info("Клиент запускается, ожидайте...")
        try {
            await invoke("run_minecraft");

            // Обновляем статус через 10 секунд
            setTimeout(() => {
                setStatus("Запущено");
            }, 10000);

            // Проверка, запущен ли Minecraft
            const checkProcess = setInterval(async () => {
                const isRunning = await invoke("check_minecraft");
                if (!isRunning) {
                    setStatus("Начать игру");
                    clearInterval(checkProcess);
                }
            }, 3000);

        } catch (error) {
            console.error("Ошибка при запуске Minecraft:", error);
            setStatus("Ошибка при запуске");
        }

    };

    const mine = (): boolean => {
        if (status == "Запущено") {
            return true;
        } else {
            return false;
        }
    }

    const install= () => {
        toast.error("Нет соединения с API сервером.")
    }

    return <>{isButtonVisible ? <button className={style.buton} disabled={mine()} onClick={runMinecraft}>{status}</button> : <button onClick={install} className={style.buton}>Установить</button>}</>
}

export default LaunchButton;