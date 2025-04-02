import React from "react";
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { toast } from "react-toastify";
import style from "./style.module.css";
import { homeDir, join } from "@tauri-apps/api/path";
import { createDir, writeBinaryFile } from "@tauri-apps/api/fs";
import axios from "axios";
import {listen} from "@tauri-apps/api/event";
import {useNavigate} from "react-router-dom";
import {useProfile} from "../../../hooks/useProfile.ts";
import {apiConfig} from "../../../configs/api.config.ts";
import {pageConfig} from "../../../configs/page.config.ts";

const LaunchButton: React.FC = () => {
    const { data } = useProfile()

    const [status, setStatus] = useState("Начать игру");
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    const navigate = useNavigate();

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
        const intervalId = setInterval(() => {
            checkGamePath();
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const runMinecraft = async () => {
        setStatus("Запуск...");
        if (!data) {
            toast.error("Данные ещё не полученны, попробуйте позже")
            return;
        }
        const nickname = data?.name
        try {
            await invoke("run_minecraft", {
                nickname: nickname
            });

            setTimeout(() => {
                setStatus("Запущено");
            }, 10000);

            const checkProcess = setInterval(async () => {
                const isRunning = await invoke("check_minecraft");
                if (!isRunning) {
                    setStatus("Начать игру");
                    clearInterval(checkProcess);
                }
            }, 3000);

        } catch (error) {
            toast.error("Ошибка при запуске Minecraft:" + error)
            console.error("Ошибка при запуске Minecraft:", error);
            setStatus("Ошибка при запуске");
        }
    };

    const mine = (): boolean => {
        return status == "Запущено";
    }

    const install = async () => {
        setIsDownloading(true);
        setStatus("Скачивание...");
        setDownloadProgress(0);

        try {
            const appDataPath = await homeDir();
            const downloadDir = await join(appDataPath, "AppData", "Roaming", ".neosoft");
            const filePath = await join(downloadDir, "game.zip");

            await createDir(downloadDir, { recursive: true });

            const response = await axios.get(`${apiConfig.baseURL}/game-download`, {
                responseType: "arraybuffer",
                onDownloadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setDownloadProgress(percentCompleted);
                    }
                },
            });

            setStatus("Запись файла...");
            setDownloadProgress(0);

            const chunkSize = 1 * 1024 * 1024;
            const buffer = new Uint8Array(response.data);
            for (let i = 0; i < buffer.length; i += chunkSize) {
                const chunk = buffer.slice(i, i + chunkSize);
                await writeBinaryFile(filePath, chunk, { append: i !== 0 });
                const progress = Math.round((i / buffer.length) * 100);
                setDownloadProgress(progress);
            }
            setDownloadProgress(100);

            setStatus("Распаковка...");
            setDownloadProgress(0);

            const unlisten = await listen<number>("extract_progress", (event) => {
                setDownloadProgress(event.payload);
            });

            await invoke("extract_zip", {
                zipPath: filePath,
                extractTo: downloadDir
            });

            unlisten();

            toast.success("Игра успешно установлена!");
            setIsButtonVisible(true);
            setIsDownloading(false);
            navigate(pageConfig.home);

        } catch (error) {
            toast.error("Ошибка при установке");
            console.error("Install error:", error);
            setStatus("Ошибка установки");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className={style.container}>
            {isButtonVisible ? (
                <button
                    className={style.button}
                    disabled={mine()}
                    onClick={runMinecraft}
                >
                    {status}
                </button>
            ) : (
                <div className={style.downloadSection}>
                    <button
                        onClick={install}
                        className={style.button}
                        disabled={isDownloading}
                    >
                        {isDownloading ? status : "Установить"}
                    </button>

                    {isDownloading && (
                        <div className={style.progressContainer}>
                            <span className={style.progressText}>
                                {downloadProgress}%
                            </span>
                            <div className={style.progressBar}>
                                <div
                                    className={style.progressFill}
                                    style={{ width: `${downloadProgress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default LaunchButton;