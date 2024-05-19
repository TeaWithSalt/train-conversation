import React, {useState} from 'react';
import {App, Button, Form, Input} from 'antd';
import styles from './LoginForm.module.css'
import {useDispatch} from "react-redux";
import {loginUser} from "../../../../store/slices/authSlice";
import {Link, useNavigate} from "react-router-dom";

export function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {message} = App.useApp();

    const logIn = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            message.loading({content: "Вхожу в аккаунт...", key: 'logIn', duration: 0})

            const data = {
                email: payload.email,
                password: payload.password
            }

            dispatch(loginUser(data)).then((response) => {
                setIsLoading(false)
                message.destroy('logIn')
                message.success({content: "Вы успешно авторизовались"})
                navigate("/")
            }, (error) => {
                setIsLoading(false)
                message.destroy('logIn')
                message.error({content: error.message})
            });
        }
    }

    return (
        <Form
            name="authorization"
            className={styles.loginForm__form}
            onFinish={logIn}
            autoComplete="off"
            layout={'vertical'}
            disabled={isLoading}
        >
            <Form.Item
                name="email"
                rules={[{required: true, message: 'Поле обязательно для ввода!'}]}
            >
                <Input placeholder="Введите почту" size="large"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{required: true, message: 'Поле обязательно для ввода!'}]}
            >
                <Input.Password placeholder="Введите пароль" size="large"/>
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" disabled={isLoading}
                    className={styles.loginForm__button}>
                Авторизоваться
            </Button>
        </Form>
    )
}
