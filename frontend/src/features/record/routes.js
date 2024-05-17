import React from 'react';
import {CatalogPage} from "./pages/CatalogPage/CatalogPage";
import MainLayout from "../../components/MainLayout/MainLayout";

export const recordRoutes = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: '',
                element: <CatalogPage/>
            }
        ]
    }
]
