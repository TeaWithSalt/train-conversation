import React from 'react';
import {Outlet} from 'react-router-dom';
import {MantineProvider} from '@mantine/core';
import styles from "./AddRecordModal.module.css"
import {Button, Modal} from "antd";

export default function AddRecordModal(props) {
    return (
        <Modal title="Добавление записи с " open={props.isModalOpen} onCancel={() => props.setIsModalOpen(false)} footer={<></>}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};
