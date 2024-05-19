import React from 'react';
import {Outlet} from 'react-router-dom';
import {MantineProvider} from '@mantine/core';
import styles from "./LandingLayout.module.css"

export default function LandingLayout() {
    return (
        <MantineProvider theme={{colorScheme: 'light'}}>
            <div className={styles.landingLayout}>
                <Outlet/>
            </div>
        </MantineProvider>
    );
};
