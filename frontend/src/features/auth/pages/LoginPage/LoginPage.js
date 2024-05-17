import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './LoginPage.module.css'
import {LoginForm} from '../../components/LoginForm/LoginForm';
import {useRive} from "@rive-app/react-canvas";

export function LoginPage() {
    const navigate = useNavigate()

    const {rive, RiveComponent} = useRive({
        src: './Train.riv',
        stateMachines: "State Machine 1",
        autoplay: true,
    });


    return (
        <div className={styles.loginPage}>
            <RiveComponent
                className={styles.loginPage__logo}/>
            <div className={styles.loginPage__titleContainer}>
                <h1 className={styles.loginPage__title}>С возвращением!</h1>
                <p className={styles.loginPage__description}>Сервис для прослушивания РПЛ <br/>и фиксации нарушений требований регламента</p>
            </div>
            <LoginForm/>
        </div>
    )
}
