import React from 'react';
import {RecordCatalogPage} from "./pages/RecordCatalogPage/RecordCatalogPage";
import MainLayout from "../../components/MainLayout/MainLayout";
import {RecordPage} from "./pages/RecordPage/RecordPage";

export const recordRoutes = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: '',
                element: <RecordCatalogPage/>
            },
            {
                path: 'record/:recordId',
                element: <RecordPage/>
            }
        ]
    }
]
