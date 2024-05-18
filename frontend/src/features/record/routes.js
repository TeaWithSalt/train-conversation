import React from 'react';
import {CatalogPage} from "./pages/CatalogPage/CatalogPage";
import MainLayout from "../../components/MainLayout/MainLayout";
import {RecordPage} from "./pages/RecordPage/RecordPage";

export const recordRoutes = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: '',
                element: <CatalogPage/>
            },
            {
                path: 'record/:recordId',
                element: <RecordPage/>
            }
        ]
    }
]
