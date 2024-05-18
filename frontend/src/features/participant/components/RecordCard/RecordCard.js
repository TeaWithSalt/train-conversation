import React from 'react';
import styles from "./RecordCard.module.css"
import {Card, Space} from "antd";
import {useNavigate} from "react-router-dom";
import ParticipantInfo from "../ParticipantInfo/ParticipantInfo";
import {ReactComponent as Arrow} from "../../../../assets/images/Arrow.svg";

export default function RecordCard(props) {
    const navigate = useNavigate()

    return (
        <Card>
            <div className={styles.recordCard}>
                <div className={styles.recordCard__up}>
                    <div className={styles.recordCard__participants}>
                        {props.record.participants.map((participant, index) => (
                            <>
                                <ParticipantInfo {...participant}/>
                                {
                                    index !== props.record.participants.length - 1 &&
                                    <svg className={styles.recordCard__line} width="150" height="56" viewBox="0 0 150 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3H150" stroke="#e21a1a80" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 10">
                                            <animate attributeName="stroke-dashoffset" values="900;0" dur="20s" repeatCount="indefinite" begin={(props.index % 2) + "s"}  />
                                        </path>
                                    </svg>
                                }
                            </>
                        ))}
                    </div>
                    <p className={styles.recordCard__date}>{new Date(props.record.date).toLocaleString()}</p>
                </div>
                <div className={styles.recordCard__down}>
                    <p className={styles.recordCard__situation}>{props.record.situationTable.name}</p>
                    <div className={styles.recordCard__moreContainer} onClick={() => navigate("record/" + props.record.id)}>
                        <p className={styles.recordCard__more}>Подробнее</p>
                        <Arrow width={20} height={33} className={styles.recordCard__arrow}/>
                    </div>
                </div>
            </div>
        </Card>
    );
};
