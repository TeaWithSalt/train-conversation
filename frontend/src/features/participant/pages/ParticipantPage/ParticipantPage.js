import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Spin, Typography} from "antd";
import {getParticipant} from "../../../../store/slices/participantSlice";
import {useParticipant} from "../../../../hooks/use-participant";
import styles from './ParticipantPage.module.css'
import Filters from "../../../record/components/Filters/Filters";
import RecordCard from "../../components/RecordCard/RecordCard";

const ParticipantPage = () => {
    const {participantId} = useParams()
    const dispatch = useDispatch()
    const {participant, isLoading} = useParticipant()
    const [displayRecords, setDisplayRecords] = useState([])

    /*useEffect(() => {
        dispatch(getParticipant(participantId))
    }, [participantId, dispatch]);*/

    const records = [
        {
            id: 1,
            situation: {
                id: 2,
                name: "Безостановочный пропуск поезда по главному железнодорожному пути железнодорожной станции при открытых входном (маршрутных) и выходном светофорах на однопутный перегон или по правильному железнодорожному пути двухпутного перегона при нормальном действии автоблокировки (полуавтоматической блокировки) и отсутствии необходимости в передаче дополнительных предупреждений\n"
            },
            date: "2024-05-17T17:30:52.255Z",
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
            ]
        },
        {
            id: 2,
            situation: {
                id: 1,
                name: "Прием поезда по регистрируемому приказу ДСП станции"
            },
            date: "2024-05-19T17:30:52.255Z",
            participants: [
                {
                    id: 2,
                    name: "Килязова Юния",
                    role: "Машинист",
                    avatarSrc: "https://i.pravatar.cc/150?img=44"
                },
                {
                    id: 1,
                    name: "Галимзянов Айнур",
                    role: "Диспетчер",
                    avatarSrc: "https://i.pravatar.cc/150?img=12"
                }
            ]
        },
        {
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
            ]
        },
        {
            id: 4,
            situation: {
                id: 1,
                name: "Прием поезда по регистрируемому приказу ДСП станции"
            },
            date: "2024-05-19T17:30:52.255Z",
            participants: [
                {
                    id: 2,
                    name: "Килязова Юния",
                    role: "Машинист",
                    avatarSrc: "https://i.pravatar.cc/150?img=44"
                },
                {
                    id: 1,
                    name: "Галимзянов Айнур",
                    role: "Диспетчер",
                    avatarSrc: "https://i.pravatar.cc/150?img=12"
                }
            ]
        }
    ]

    if(!participant)
        return <Spin/>

    return (
        <div className={styles.page}>
            <div className={styles.info}>
                <Avatar size={128} alt={'avatar'} src={participant.url}/>
                <div className={styles.commonInfo}>
                    <Typography title={3} className={styles.name}>
                        {participant.name}
                    </Typography>
                    <Typography className={styles.role}>
                        {participant.role}
                    </Typography>
                    <Typography className={styles.recordCount}>
                        Записи: {participant.recordCount}
                    </Typography>
                </div>
            </div>
            <h1 className={styles.records}>
                Записи
            </h1>
            <Filters withParticipants={false} records={records} setRecords={setDisplayRecords}/>
            {displayRecords.map((record, index) => <RecordCard record={record} index={index}/>)}
        </div>
    );
};

export default ParticipantPage;
