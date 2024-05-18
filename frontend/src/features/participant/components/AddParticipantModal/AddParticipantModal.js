import React, {useState} from 'react';
import styles from "./AddParticipantModal.module.css"
import {App, Avatar, Button, Card, Flex, Form, Input, Modal} from "antd";
import {useDispatch} from "react-redux";
import {createParticipant} from "../../../../store/slices/participantSlice";


export default function AddParticipantModal(props) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {message} = App.useApp();
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [avatarSrc, setAvatarSrc] = useState("")

    const addParticipant = (payload) => {
        if (!isLoading) {
            setIsLoading(true);
            message.loading({content: "Создаю сотрудника...", key: 'addParticipant', duration: 0})

            dispatch(createParticipant(payload)).then((response) => {
                setIsLoading(false)
                message.destroy('addParticipant')
                message.success({content: "Сотрудник успешно создан!"})
                props.setIsModalOpen(false)
            }, (error) => {
                setIsLoading(false)
                message.destroy('addParticipant')
                message.error({content: error.message})
            });
        }
    }

    return (
        <Modal
            title="Добавление нового сотрудника"
            open={props.isModalOpen}
            onCancel={() => props.setIsModalOpen(false)}
            footer={null}
        >
            <Form
                name="addRecord"
                className={styles.addParticipantForm}
                onFinish={addParticipant}
                autoComplete="off"
                layout={'vertical'}
                disabled={isLoading}
            >
                <Flex vertical={true} style={{width: '100%'}}>
                    <Form.Item
                        name="name"
                        rules={[{required: true, message: 'Поле обязательно для ввода!'}]}
                        style={{width: '100%'}}
                    >
                        <Input
                            onChange={(evt) => setName(evt.target.value)}
                            size="large"
                            style={{width: '100%'}}
                            placeholder="Введите ФИО сотрудника"
                        />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        rules={[{required: true, message: 'Поле обязательно для ввода!'}]}
                        style={{width: '100%'}}
                    >
                        <Input
                            onChange={(evt) => setRole(evt.target.value)}
                            size="large"
                            style={{width: '100%'}}
                            placeholder="Введите роль сотрудника"
                        />
                    </Form.Item>
                    <Form.Item
                        name="avatarSrc"
                        rules={[{required: true, message: 'Поле обязательно для ввода!'}]}
                        style={{width: '100%'}}
                    >
                        <Input
                            size="large"
                            onChange={(evt) => setAvatarSrc(evt.target.value)}
                            style={{width: '100%'}}
                            placeholder="Введите ссылку на аватар сотрудника"
                        />
                    </Form.Item>
                </Flex>

                {
                    name !== "" && avatarSrc !== "" && role !== "" &&
                    <Form.Item className={styles.addParticipantForm__preview}>
                        <h2>Превью</h2>
                        <Card>
                            <div className={styles.participantCard}>
                                <Avatar size={64} src={avatarSrc}/>
                                <div>
                                    <p className={styles.participantCard__name}>{name}</p>
                                    <p className={styles.participantCard__role}>{role}</p>
                                </div>
                            </div>
                        </Card>
                    </Form.Item>
                }

                <Form.Item className={styles.addParticipantForm__submitButton}>
                    <Button type="primary" htmlType="submit" size="large" disabled={isLoading}>
                        Создать сотрудника
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
