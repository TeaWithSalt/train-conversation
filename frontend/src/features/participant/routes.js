import React from 'react';
import {ParticipantsCatalogPage} from "./pages/ParticipantsCatalogPage/ParticipantsCatalogPage";
import MainLayout from "../../components/MainLayout/MainLayout";
import ParticipantPage from "./pages/ParticipantPage/ParticipantPage";

export const participantsRoutes = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: '/participants',
                element: <ParticipantsCatalogPage/>
            }
        ]
    },
    {
        element: <MainLayout/>,
        children: [
            {
                path: '/participants/:participantId',
                element: <ParticipantPage/>
            }
        ]
    }
]
