import style from "./style.module.css"
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../providers/AuthProvider.tsx";
import { Link } from "react-router-dom";
import { pageConfig } from "../../configs/page.config.ts";
import { open } from "@tauri-apps/api/shell";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<SVGSVGElement>(null);

    const { logout } = useAuth()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClick = async (e: React.MouseEvent):Promise<void> => {
        e.preventDefault();
        await open("https://t.me/fdtplace")
    }

    return <>
        <header className={style.header}>
            <div className={style.navigation}>
                <Link to={pageConfig.home}>Главная</Link>
                <Link to={pageConfig.shop}>Магазин</Link>
                <a href="/">Наш сайт</a>
            </div>
            <div className={style.right}>
                <Link className={style.icons} inputMode="url" to="/" onClick={handleClick}>
                    <svg className={style.icon} width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0.913847C4.48 0.913847 0 5.38006 0 10.8831C0 16.3861 4.48 20.8523 10 20.8523C15.52 20.8523 20 16.3861 20 10.8831C20 5.38006 15.52 0.913847 10 0.913847ZM14.64 7.69292C14.49 9.26806 13.84 13.0962 13.51 14.8608C13.37 15.6085 13.09 15.8577 12.83 15.8876C12.25 15.9375 11.81 15.5088 11.25 15.1399C10.37 14.5617 9.87 14.2028 9.02 13.6446C8.03 12.9966 8.67 12.6377 9.24 12.0594C9.39 11.9099 11.95 9.58708 12 9.37772C12.0069 9.34601 12.006 9.3131 11.9973 9.28182C11.9886 9.25055 11.9724 9.22187 11.95 9.19828C11.89 9.14843 11.81 9.16837 11.74 9.17834C11.65 9.19828 10.25 10.1254 7.52 11.9598C7.12 12.2289 6.76 12.3685 6.44 12.3585C6.08 12.3486 5.4 12.1591 4.89 11.9897C4.26 11.7903 3.77 11.6806 3.81 11.3317C3.83 11.1522 4.08 10.9728 4.55 10.7834C7.47 9.51729 9.41 8.67988 10.38 8.28111C13.16 7.12468 13.73 6.92529 14.11 6.92529C14.19 6.92529 14.38 6.94523 14.5 7.04492C14.6 7.12468 14.63 7.23434 14.64 7.31409C14.63 7.37391 14.65 7.55335 14.64 7.69292Z" fill="#FAFCFF"/>
                    </svg>
                </Link>
                <a className={style.icons} href="/">
                    <svg className={style.icon} width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 0.913847H2C0.9 0.913847 0.00999999 1.81108 0.00999999 2.90769L0 20.8523L4 16.8646H18C19.1 16.8646 20 15.9674 20 14.8708V2.90769C20 1.81108 19.1 0.913847 18 0.913847ZM7 9.88616H5V7.89231H7V9.88616ZM11 9.88616H9V7.89231H11V9.88616ZM15 9.88616H13V7.89231H15V9.88616Z" fill="#FAFCFF"/>
                    </svg>
                </a>
                <div className={style.line}></div>
                <img src="https://i.pinimg.com/736x/42/34/11/423411bccfe875a71f1b2ecde5fcbee5.jpg" alt=""/>
                <svg ref={buttonRef} onClick={toggleMenu} style={{marginLeft: "20px", marginRight: "30px", cursor: "pointer"}} width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.38889 20C0.995375 20 0.665745 19.84 0.400005 19.52C0.134264 19.2 0.000930715 18.8044 4.78926e-06 18.3333C-0.000921136 17.8622 0.132412 17.4666 0.400005 17.1466C0.667597 16.8266 0.997227 16.6666 1.38889 16.6666H23.6111C24.0046 16.6666 24.3347 16.8266 24.6014 17.1466C24.868 17.4666 25.0009 17.8622 25 18.3333C24.9991 18.8044 24.8657 19.2005 24.6 19.5216C24.3343 19.8428 24.0046 20.0022 23.6111 20H1.38889ZM1.38889 11.6667C0.995375 11.6667 0.665745 11.5067 0.400005 11.1867C0.134264 10.8667 0.000930715 10.4711 4.78926e-06 9.99999C-0.000921136 9.52888 0.132412 9.13332 0.400005 8.81332C0.667597 8.49332 0.997227 8.33332 1.38889 8.33332H23.6111C24.0046 8.33332 24.3347 8.49332 24.6014 8.81332C24.868 9.13332 25.0009 9.52888 25 9.99999C24.9991 10.4711 24.8657 10.8672 24.6 11.1883C24.3343 11.5094 24.0046 11.6689 23.6111 11.6667H1.38889ZM1.38889 3.33333C0.995375 3.33333 0.665745 3.17333 0.400005 2.85333C0.134264 2.53333 0.000930715 2.13778 4.78926e-06 1.66666C-0.000921136 1.19555 0.132412 0.799999 0.400005 0.48C0.667597 0.16 0.997227 0 1.38889 0H23.6111C24.0046 0 24.3347 0.16 24.6014 0.48C24.868 0.799999 25.0009 1.19555 25 1.66666C24.9991 2.13778 24.8657 2.53389 24.6 2.855C24.3343 3.17611 24.0046 3.33555 23.6111 3.33333H1.38889Z" fill="#FAFCFF" />
                </svg>

            </div>
        </header>

        <div ref={menuRef} className={`${style.menu} ${isOpen ? style.menuOpen : ""}`}>
            <nav className={style.menuNav}>
                <Link to={pageConfig.profile}><i className='bx bx-user'></i> Профиль</Link>
                <Link to={pageConfig.settings}><i className='bx bx-cog'></i> Настройки</Link>
                <Link to={pageConfig.about}><i className='bx bx-info-circle' ></i> О приложении</Link>
                <a href="#" onClick={() => {
                    logout()
                }}><i className='bx bx-log-out'></i> Выйти</a>
            </nav>
        </div>
    </>
}