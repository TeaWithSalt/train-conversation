import React from 'react';
import styles from './RecordPage.module.css'
import {Breadcrumb, DatePicker} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import RecordRecognitionText from "../../components/RecordRecognitionText/RecordRecognitionText";
import RecordInfo from "../../components/RecordInfo/RecordInfo";
import RecordSituationTable from "../../components/RecordSituationTable/RecordSituationTable";

const {RangePicker} = DatePicker;

const onOk = (value) => {
    console.log('onOk: ', value);
};

export function RecordPage(props) {
    const navigate = useNavigate()
    const {recordId} = useParams()

    const record = {
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
    }

    return (
        <div className={styles.recordPage}>
            <Breadcrumb
                items={[
                    {
                        title: <Link to="/">Записи разговоров</Link>,
                    },
                    {
                        title: 'Запись от ' + new Date(record.date).toLocaleString(),
                    }
                ]}
            />
            <div className={styles.recordPage__container}>
                <div className={styles.recordPage__left}>
                    <RecordSituationTable/>
                    <RecordRecognitionText/>
                </div>
                <div className={styles.recordPage__right}>
                    <RecordInfo/>
                </div>
            </div>
        </div>
    )
}
