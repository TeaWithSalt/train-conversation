import React, {useEffect} from 'react';
import styles from "./Header.module.css"
import {Avatar, Button, Tooltip} from "antd";
import {useProfile} from "../../hooks/use-profile";
import {ReactComponent as Logo} from "../../assets/images/Logo.svg";
import {useDispatch} from "react-redux";
import {getUserProfile, removeUser} from "../../store/slices/userSlice";
import {LogoutOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {removeAuth} from "../../store/slices/authSlice";

export default function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useProfile()

    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    const logout = () => {
        dispatch(removeUser())
        dispatch(removeAuth())
    }

    const toCatalog = () => {
        navigate("/")
    }

    return (
        <div className={styles.header}>
            <Logo width={250} className={styles.header__logo} onClick={toCatalog}/>

            <div className={styles.header__navigation}>
                <Button type="text" size="large">
                    <Link className={styles.header__navigation} to="/">Записи</Link>
                </Button>
                <Button type="text" size="large">
                    <Link className={styles.header__navigation} to="/participants">Участники</Link>
                </Button>
            </div>

            <div className={styles.header__profile}>
                <div className={styles.header__profile__name}>
                    <Avatar src={user ? user.avatarSrc : ""}/>
                    <p>{user ? user.firstName + " " + user.secondName : ""}</p>
                </div>
                <Button icon={<LogoutOutlined/>} onClick={logout}/>
            </div>
        </div>
    );
};
