import React from 'react';
import styles from './LoginPage.module.css'
import {LoginForm} from '../../components/LoginForm/LoginForm';
import {Alignment, Fit, Layout, useRive} from "@rive-app/react-canvas";
import {Card} from "antd";
import {ReactComponent as Logo} from "../../../../assets/images/Logo.svg";

export function LoginPage() {
    const {rive, RiveComponent} = useRive({
        src: './Train2.riv',
        stateMachines: "State Machine 1",
        autoplay: true,
        layout: new Layout({fit: Fit.Cover, alignment: Alignment.Center})
    });


    return (
        <div className={styles.loginPage}>
            <RiveComponent className={styles.riveAnimation}/>
            <div className={styles.loginCard}>
                <Logo className={styles.logo}/>

                <div className={styles.formContainer}>
                    <h3 className={styles.loginPage__description}>
                        Cервис для прослушивания РПЛ и
                        фиксации нарушений требований регламента
                    </h3>

                    <LoginForm className={styles.form}/>
                </div>
            </div>
        </div>
    )
}
