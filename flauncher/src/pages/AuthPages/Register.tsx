import { FC } from "react";

import style from "./style.module.css"
import {SubmitHandler, useForm} from "react-hook-form";
import {IRegister} from "../../types/auth.type.ts";
import {useRegister} from "../../hooks/useRegister.ts";
import {Link} from "react-router-dom";
import {pageConfig} from "../../configs/page.config.ts";

export const Register: FC = () => {
    const {mutate} = useRegister()

    const {register, handleSubmit} = useForm<IRegister>({
        mode: "onChange",
    })

    const onSubmit:SubmitHandler<IRegister> = (data:IRegister) => {
        mutate(data)
    }

    return (
        <>
            <img className={style.art} src="/Auth/artAuth.png" alt=""/>
            <div className={style.form}>
                <form onSubmit={handleSubmit(onSubmit)} className={style.sub_form}>
                    <h2>Регистрация</h2>
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
                        <h3>E-mail</h3>
                        <input
                            type="email"
                            placeholder="Введите электронную почту"
                            {...register('email', {
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
                    <Link to={pageConfig.login}>Есть аккаунт?</Link>
                    <div className={style.button}>
                        <button type='submit'>Зарегистрироватся</button>
                    </div>
                </form>
            </div>
        </>
    );
};