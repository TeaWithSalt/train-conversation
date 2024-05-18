import React from 'react';
import {ParticipantsCatalogPage} from "./pages/ParticipantsCatalogPage/ParticipantsCatalogPage";
import MainLayout from "../../components/MainLayout/MainLayout";

export const participantsRoutes = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: '/participants',
                element: <ParticipantsCatalogPage/>
            }
        ]
    }
]
