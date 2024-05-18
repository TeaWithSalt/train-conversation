import {useRoutes} from 'react-router-dom';
import {authRoutes} from "../features/auth/routes";
import NotAuthGuard from "./guards/notAuthGuard";
import AuthGuard from "./guards/authGuard";
import {recordRoutes} from "../features/record/routes";
import {participantsRoutes} from "../features/participant/routes";

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
            ...recordRoutes,
            ...participantsRoutes
        ]
    }
];

export const RootRouter = () => useRoutes(routes);
