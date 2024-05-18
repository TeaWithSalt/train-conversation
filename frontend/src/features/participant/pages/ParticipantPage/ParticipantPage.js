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

    useEffect(() => {
        dispatch(getParticipant(participantId))
    }, [participantId, dispatch]);

    if(!participant || isLoading)
        return <Spin/>
    return (
        <div className={styles.page}>
            <div className={styles.info}>
                <Avatar size={128} alt={'avatar'} src={participant.avatarSrc}/>
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
            <Filters withParticipants={false} records={participant.records ?? []} setRecords={setDisplayRecords}/>
            {displayRecords.map((record, index) => <RecordCard record={record} index={index}/>)}
        </div>
    );
};

export default ParticipantPage;
