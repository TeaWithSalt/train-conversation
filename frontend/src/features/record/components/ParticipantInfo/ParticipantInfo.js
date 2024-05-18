import React from 'react';
import styles from "./ParticipantInfo.module.css"
import {Avatar, Card} from "antd";
import {useNavigate} from "react-router-dom";

export default function ParticipantInfo(props) {
    const navigate = useNavigate()

    return (
        <div className={styles.participantInfo}>
            <Avatar size={56} src={props.avatarSrc}/>
            <p className={styles.participantInfo__name}>{props.name}</p>
            <p className={styles.participantInfo__role}>{props.role}</p>
        </div>
    );
};
