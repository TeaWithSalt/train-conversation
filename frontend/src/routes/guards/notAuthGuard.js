import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAuth} from '../../hooks/use-auth';
import {App, message} from "antd";

export default function NotAuthGuard() {
    const user = useAuth();
    const location = useLocation();
    const [msg, contextHolder] = message.useMessage({content: "Вы уже авторизованы!"});

    if (user.isAuth) {
        const redirect = {
            pathname: location.search.slice(1) ?? '/',
        };

        msg.error({content: "Вы уже авторизованы!", maxCount: 1})

        return <>
            {contextHolder}
            <Navigate to={redirect} replace/>
        </>
    }

    return <Outlet/>;
};
