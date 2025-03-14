import { FC } from 'react';

import style from "./style.module.css"
import {SubmitHandler, useForm} from "react-hook-form";
import {ILogin} from "../../types/auth.type.ts";
import {useLogin} from "../../hooks/useLogin.ts";
import {Link} from "react-router-dom";
import {pageConfig} from "../../configs/page.config.ts";

export const Login: FC = () => {
    const { mutate } = useLogin()

    const {register, handleSubmit} = useForm<ILogin>({
        mode: "onChange",
    })

    const onSubmit:SubmitHandler<ILogin> = (data:ILogin) => {
        mutate(data)
    }

    return (
        <>
            <img className={style.art} src="/Auth/artAuth.png" alt=""/>
            <div className={style.form}>
                <form onSubmit={handleSubmit(onSubmit)} className={style.sub_form}>
                    <h2>Авторизация</h2>
                    <div className={style.input}>
                        <h3>Логин</h3>
                        <input
                            type="text"
                            placeholder="Введите игровой ник"

                            {...register('name', {
                                required: "This field is required"
                            })}
                        />
                    </div>
                    <div className={style.input}>
                        <h3>Пароль</h3>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            {...register('password', {
                                required: "This field is required"
                            })}
                        />
                    </div>
                    <Link to={pageConfig.register}>Нет аккаунта? зарегистрироватся</Link>
                    <div className={style.button}>
                        <button type='submit'>Войти</button>
                    </div>
                </form>
            </div>
        </>
    );
};
