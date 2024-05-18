import React from 'react';
import {Outlet} from 'react-router-dom';
import {Layout} from "antd";
import Header from "../Header/Header";

export default function MainLayout() {
    return (
        <Layout>
            <Layout.Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: "white",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    zIndex: 1000
                }}
            >
                <Header/>
            </Layout.Header>
            <Layout.Content style={{padding: '0 48px', minHeight: "calc(100vh - 64px)", height: "100%", marginTop: '64px'}}>
                <Outlet/>
            </Layout.Content>

        </Layout>
    )
};
