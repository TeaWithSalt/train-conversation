import React from 'react';
import {Avatar, Card, Flex, Space} from "antd";
import {useNavigate} from "react-router-dom";
import styles from "./RecordRecognitionText.module.css"

export default function RecordRecognitionText(props) {
    const navigate = useNavigate()

    const recognitionText = [
        {
            participant: {
                id: 2,
                name: "Килязова Юния",
                role: "Машинист",
                avatarSrc: "https://i.pravatar.cc/150?img=44"
            },
            message: "<mark>22-ой машинист</mark> Карабин на перегоне Красногвардеец- 2 Погромное"
        },
        {
            participant: {
                id: 1,
                name: "Галимзянов Айнур",
                role: "Диспетчер",
                avatarSrc: "https://i.pravatar.cc/150?img=12"
            },
            message: "2422 Карабин, слушает Вас"
        },
        {
            participant: {
                id: 2,
                name: "Килязова Юния",
                role: "Машинист",
                avatarSrc: "https://i.pravatar.cc/150?img=44"
            },
            message: "<mark>Здравствуйте</mark>, машинист. <mark>Не затягивайтесь, хорошо</mark>. До станции Сорочинская проедьте, пожалуйста. По Тоцкой по первому пути будет ехать ДНЦ Бахтинова"
        },
        {
            participant: {
                id: 1,
                name: "Галимзянов Айнур",
                role: "Диспетчер",
                avatarSrc: "https://i.pravatar.cc/150?img=12"
            },
            message: "Понятно. С Тоцкой по первому пути до Сорочинск максимально допустимой следуем Бахтинова Карабин"
        }

    ]

    return (
        <Card>
            <h2>
                Распознанный моделью текст
            </h2>
            <div className={styles.recognitionText}>
                {
                    recognitionText &&
                    recognitionText.map(chat => (
                        <div className={styles.chat}>
                            <Avatar size={48} src={chat.participant.avatarSrc}/>
                            <Flex vertical={true}>
                                <p className={styles.chat__name}>
                                    {chat.participant.name}
                                </p>
                                <p className={styles.chat__message} dangerouslySetInnerHTML={{__html: chat.message}}/>
                            </Flex>
                        </div>
                    ))
                }
            </div>
        </Card>
    );
};
