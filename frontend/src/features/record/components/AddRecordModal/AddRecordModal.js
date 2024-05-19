import React, {useEffect, useState} from 'react';
import styles from "./AddRecordModal.module.css"
import {App, Avatar, Button, DatePicker, Flex, Form, Modal, Select, Space, Upload} from "antd";
import {useDispatch} from "react-redux";
import {InboxOutlined} from "@ant-design/icons";
import {createRecord} from "../../../../store/slices/recordSlice";
import {useParticipants} from "../../../../hooks/use-participants";
import {getParticipants} from "../../../../store/slices/participantsSlice";

const {Dragger} = Upload;

export default function AddRecordModal(props) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {message} = App.useApp();

    const [fileList, setFileList] = useState([]);

    const participants = useParticipants()

    useEffect(() => {
        dispatch(getParticipants())
    }, []);

    const addRecord = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            message.loading({content: "Обрабатываю запись...", key: 'addRecord', duration: 0})

            dispatch(createRecord({
                date: payload.date,
                participants: payload.participants,
                file: fileList[0],
            })).then((response) => {
                setIsLoading(false)
                message.destroy('addRecord')
                message.success({content: "Запись успешно добавлена"})
            }, (error) => {
                setIsLoading(false)
                message.destroy('addRecord')
                message.error({content: error.message})
            });
        }
    }

    return (
        <Modal
            title="Добавление записи с РПЛ"
            open={props.isModalOpen}
            onCancel={() => props.setIsModalOpen(false)}
            footer={null}
            className={styles.addRecordModal}
        >
            <Form
                name="addRecord"
                className={styles.addRecordForm}
                onFinish={addRecord}
                autoComplete="off"
                layout={'vertical'}
                disabled={isLoading}
            >
                <Flex vertical={true} style={{width: '100%'}}>
                    <Form.Item
                        name="date"
                        rules={[{required: true, message: 'Поле обязательно для ввода!'}]}
                        style={{width: '100%'}}
                    >
                        <DatePicker size="large" style={{width: '100%'}} showTime
                                    placeholder="Выберите дату и время начала записи"/>
                    </Form.Item>

                    <Form.Item
                        name="participants"
                        rules={[
                            {required: true, message: 'Поле обязательно для ввода!'},
                            {len: 2, type: "array", message: "Необходимо выбрать двух участников"}
                        ]}
                        style={{width: '100%'}}
                    >
                        <Select
                            mode="multiple"
                            size="large"
                            style={{width: '100%'}}
                            placeholder="Выберите двух участников"
                            options={participants.roles.map(role => ({
                                label: <span>{role.roleName}</span>,
                                title: role.roleName,
                                options: role.participants.map(participant => ({
                                    label: <span>{participant.name}</span>,
                                    value: participant.id,
                                    avatarSrc: participant.avatarSrc
                                }))
                            }))}
                            optionRender={(option) => (
                                <Space>
                                    <Avatar size={"small"} src={option.data.avatarSrc} alt=""/>
                                    {option.data.label}
                                </Space>
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        name="file"
                        rules={[
                            {required: true, message: 'Поле обязательно для ввода!'},
                        ]}
                        style={{width: '100%'}}
                    >
                        <Dragger multiple={false}
                                 onRemove={(file) => {
                                     const index = fileList.indexOf(file);
                                     const newFileList = fileList.slice();
                                     newFileList.splice(index, 1);
                                     setFileList(newFileList);
                                 }}
                                 beforeUpload={(file) => {
                                     setFileList([file]);
                                     return false;
                                 }}
                                 onChange={info => console.log(info)}
                                 fileList={fileList}
                        >
                            <p className="ant-upload-drag-icon"><InboxOutlined/></p>
                            <p className="ant-upload-text">
                                Кликните или перенесите аудио-файл<br/>с записью разговора (.wav)
                            </p>
                        </Dragger>
                    </Form.Item>
                </Flex>
                <Form.Item className={styles.addRecordForm__submitButton}>
                    <Button type="primary" htmlType="submit" size="large" disabled={isLoading}>
                        Начать обработку записи
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
