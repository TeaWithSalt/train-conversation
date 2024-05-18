import React, {useCallback, useMemo} from 'react';
import styles from "./RecordCard.module.css"
import {Card} from "antd";
import {useNavigate} from "react-router-dom";
import ParticipantInfo from "../ParticipantInfo/ParticipantInfo";
import {getDateFromISO} from "../../../../lib/getDateFromISO";
import {getTime} from "../../../../lib/getTime";

export default function RecordCard(props) {
    const navigate = useNavigate()

    const endTime = useMemo(() => {
        const date = new Date(props.record.date)
        date.setSeconds(date.getSeconds() + props.record.duration)
        return getTime(date);
    }, [props])

    return (
        <Card>
            <div className={styles.recordCard}>
                <div className={styles.recordCard__up}>
                    <p className={styles.recordCard__situation}>{props.record.situationTable.name}</p>
                    <div className={styles.separator}/>
                    <p className={styles.recordCard__date}>{getDateFromISO(props.record.date)}</p>
                    <div className={styles.separator}/>
                    <div className={styles.recordCard__moreContainer}
                         onClick={() => navigate("record/" + props.record.id)}>
                        <p className={styles.recordCard__more}>Подробнее</p>
                    </div>
                </div>

                <div className={styles.mainContainer}>
                    <div className={styles.mainLeftContainer}>
                        <div className={styles.recordCard__participants}>
                            {props.record.participants.map((participant, index) => (
                                <>
                                    <ParticipantInfo {...participant}/>
                                    {
                                        index !== props.record.participants.length - 1 &&
                                        <div className={styles.duration}>
                                            <svg className={styles.recordCard__line} width="150" height="56"
                                                 viewBox="0 0 150 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 3H150" stroke="#e21a1a80" strokeWidth="3"
                                                      strokeLinecap="round"
                                                      strokeDasharray="10 10">
                                                    <animate attributeName="stroke-dashoffset" values="900;0" dur="20s"
                                                             repeatCount="indefinite" begin={(props.index % 2) + "s"}/>
                                                </path>
                                            </svg>
                                            <p className={styles.durationValue}>
                                                {Math.ceil(props.record.duration / 60)} мин.
                                            </p>
                                        </div>
                                    }
                                </>
                            ))}
                        </div>
                    </div>

                    <div className={styles.mainRightContainer}>
                        <div className={styles.statisticsLine}>
                            <p className={styles.statisticsKey}>Ошибок</p>
                            <p className={`${styles.statisticsValue} ${styles.statisticsValueError}`}>
                                {props.record.errorsCount}
                            </p>
                        </div>
                        <div className={styles.statisticsLine}>
                            <p className={styles.statisticsKey}>Начало разговора</p>
                            <p className={styles.statisticsValue}>
                                {getTime(new Date(props.record.date))}
                            </p>
                        </div>
                        <div className={styles.statisticsLine}>
                            <p className={styles.statisticsKey}>Конец разговора</p>
                            <p className={styles.statisticsValue}>
                                {endTime}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
