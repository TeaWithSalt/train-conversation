import React from 'react';
import {Outlet} from 'react-router-dom';
import {MantineProvider} from '@mantine/core';
import styles from "./Header.module.css"
import {Button} from "antd";

export default function Header(props) {
    return (
        <div className={styles.header}>
            <Button type="primary" onClick={props.openAddRecordModal}>Добавить запись</Button>
        </div>
    );
};
