import {useRoutes} from 'react-router-dom';
import {authRoutes} from "../features/auth/routes";
import NotAuthGuard from "./guards/notAuthGuard";
import AuthGuard from "./guards/authGuard";
import {recordRoutes} from "../features/record/routes";

const routes = [
    {
        element: <NotAuthGuard/>,
        children: [
            ...authRoutes
        ]
    },
    {
        element: <AuthGuard/>,
        children: [
            ...recordRoutes
        ]
    }
];

export const RootRouter = () => useRoutes(routes);
