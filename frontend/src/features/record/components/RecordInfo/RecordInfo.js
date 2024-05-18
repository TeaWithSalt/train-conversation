import React from 'react';
import {Avatar, Card, Statistic} from "antd";
import {useNavigate} from "react-router-dom";
import styles from "./RecordInfo.module.css"
import ReactAudioPlayer from "react-audio-player";

export default function RecordInfo(props) {
    return (
        <Card>
            <h2>Информация о записи</h2>
            <div className={styles.recordInfo}>
                <div className={styles.recordInfo__item}>
                    <p className={styles.recordInfo__item__title}>Дата начала записи</p>
                    <p className={styles.recordInfo__item__value}>{new Date(props.record.date).toLocaleString()}</p>
                </div>
                <div className={styles.recordInfo__item}>
                    <p className={styles.recordInfo__item__title}>Участники</p>
                    <div className={styles.recordInfo__participants}>
                        {
                            props.record.participants.map(participant => (
                                <div className={styles.recordInfo__participant}>
                                    <Avatar size={48} src={participant.avatarSrc}/>
                                    <div className={styles.recordInfo__participant__nameContainer}>
                                        <p className={styles.recordInfo__participant__name}>{participant.name}</p>
                                        <p className={styles.recordInfo__participant__role}>{participant.role}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Card>
    );
};
