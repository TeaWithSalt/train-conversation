import React from 'react';
import {Avatar, Card, Flex, Space} from "antd";
import {useNavigate} from "react-router-dom";
import styles from "./RecordRecognitionText.module.css"

export default function RecordRecognitionText(props) {
    const navigate = useNavigate()

    return (
        <Card>
            <h2>
                Распознанный моделью текст
            </h2>
            <div className={styles.recognitionText}>
                {
                    props.recognitionChats &&
                    props.recognitionChats.map(chat => (
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
