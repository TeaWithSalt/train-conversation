import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from "./AddRecordModal.module.css"
import {App, Avatar, Button, DatePicker, Flex, Form, Modal, Select, Space, Upload} from "antd";
import {useDispatch} from "react-redux";
import {InboxOutlined} from "@ant-design/icons";

const {Dragger} = Upload;

export default function AddRecordModal(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {message} = App.useApp();

    const [fileList, setFileList] = useState([]);


    const options = [
        {
            label: <span>Машинисты</span>,
            title: 'Машинисты',
            options: [
                {
                    label: <span>Иванов Иван</span>,
                    value: 'Jack',
                    avatarSrc: "https://avatars.githubusercontent.com/u/115563530?v=4"
                },
                {label: <span>Галимзянов Айнур</span>, value: '1'},
            ],
        },
        {
            label: <span>Диспетчеры</span>,
            title: 'Диспетчеры',
            options: [
                {label: <span>Chloe</span>, value: 'Chloe'},
                {label: <span>Lucas</span>, value: 'Lucas'},
            ],
        },
    ]

    const addRecord = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            console.log(payload, fileList)
            // message.loading({content: "Вхожу в аккаунт...", key: 'logIn', duration: 0})
            //
            // const data = {
            //     email: payload.email,
            //     password: payload.password
            // }
            //
            // dispatch(loginUser(data)).then((response) => {
            //     setIsLoading(false)
            //     message.destroy('logIn')
            //     message.success({content: "Вы успешно авторизовались"})
            //     navigate("/")
            // }, (error) => {
            //     setIsLoading(false)
            //     message.destroy('logIn')
            //     message.error({content: error.message})
            // });
        }
    }

    return (
        <Modal
            title="Добавление записи с РПЛ"
            open={props.isModalOpen}
            onCancel={() => props.setIsModalOpen(false)}
            footer={<></>}
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
                            // onChange={handleChange}
                            options={options}
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
                                 fileList={fileList}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Кликните или перенесите аудио-файл<br/> с записью разговора</p>
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
