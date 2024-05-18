import React, {useCallback, useMemo} from 'react';
import styles from "./ParticipantInfo.module.css"
import {Avatar, Card} from "antd";
import {Link, useNavigate} from "react-router-dom";

export default function ParticipantInfo(props) {
    const shortName = useMemo(() => {
        return props.name.split(' ').map((part, i) => i !== 0 ? `${part[0]}.` : `${part} `).join('')
    },[props.name])

    return (
        <Link to={`/participants/${props.id}`} className={styles.participantInfo}>
            <Avatar size={56} src={props.avatarSrc}/>
            <p className={styles.participantInfo__name}>{shortName}</p>
            <p className={styles.participantInfo__role}>{props.role}</p>
        </Link>
    );
};
