import React from 'react';
import {Avatar, Card, Statistic} from "antd";
import {useNavigate} from "react-router-dom";
import styles from "./RecordInfo.module.css"
import ReactAudioPlayer from "react-audio-player";

export default function RecordInfo(props) {
    const navigate = useNavigate()

    const recordInfo = {
        id: 3,
        situation: {
            id: 1,
            name: "Прием поезда по регистрируемому приказу ДСП станции"
        },
        date: "2024-05-19T17:30:52.255Z",
        participants: [
            {
                id: 1,
                name: "Галимзянов Айнур",
                role: "Диспетчер",
                avatarSrc: "https://i.pravatar.cc/150?img=12"
            },
            {
                id: 2,
                name: "Килязова Юния",
                role: "Машинист",
                avatarSrc: "https://i.pravatar.cc/150?img=44"
            }
        ],
        audio: "https://s10myt.storage.yandex.net/get-mp3/8afdfa7cf1cc82c057c8916413d1fc1c/000618b115563f9b/rmusic/U2FsdGVkX18vcJsXdxYg1PeNSseXWmjGwV9rcw4Z8U3YfKl46_KfwuJMMqseUGf1HVjvIkekLNMYuP1VlOL_FywpT6nKAsMoIgJ8-c2-MjQ/339b493dd462de349f2384041d3cabfa4da5b916214265d2e933f8cfdf187630/29663?track-id=120362106&play=false"
    }


    return (
        <Card>
            <h2>Информация о записи</h2>
            <div className={styles.recordInfo}>
                <div className={styles.recordInfo__item}>
                    <p className={styles.recordInfo__item__title}>Дата начала записи</p>
                    <p className={styles.recordInfo__item__value}>{new Date(recordInfo.date).toLocaleString()}</p>
                </div>
                <div className={styles.recordInfo__item}>
                    <p className={styles.recordInfo__item__title}>Участники</p>
                    <div className={styles.recordInfo__participants}>
                        {
                            recordInfo.participants.map(participant => (
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
                <div className={styles.recordInfo__item}>
                    <p className={styles.recordInfo__item__title}>Аудиозапись разговора</p>
                    <ReactAudioPlayer src={recordInfo.audio} controls/>
                </div>
            </div>
        </Card>
    );
};
