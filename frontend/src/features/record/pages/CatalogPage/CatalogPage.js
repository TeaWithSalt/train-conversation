import React, {useEffect, useState} from 'react';
import styles from './CatalogPage.module.css'
import RecordCard from "../../components/RecordCard/RecordCard";
import {Button, Card, DatePicker} from "antd";
import AddRecordModal from "../../../../components/AddRecordModal/AddRecordModal";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {getParticipants} from "../../../../store/slices/participantsSlice";
import {useParticipants} from "../../../../hooks/use-participants";
import Filters from "../../components/Filters/Filters";
import {useRecords} from "../../../../hooks/use-records";
import {getRecords} from "../../../../store/slices/recordsSlice";


export function CatalogPage(props) {
    const dispatch = useDispatch()
    const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
    const [displayRecords, setDisplayRecords] = useState([])
    const records1 = useRecords()

    useEffect(() => {
        dispatch(getRecords())
    }, [])


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

    return (
        <div className={styles.catalogPage}>
            <div className={styles.catalogPage__titleContainer}>
                <h1>Записи переговоров</h1>
                <Button
                    type="primary"
                    onClick={() => setIsAddRecordModalOpen(true)}
                    className={styles.catalogPage__addButton}
                    size="large"
                    icon={<PlusOutlined/>}
                >
                    Добавить запись
                </Button>
            </div>
            <div className={styles.catalogPage__content}>
                <div className={styles.catalogPage__left}>
                    <div className={styles.catalogPage__records}>
                        {
                            displayRecords && displayRecords.length > 0 &&
                            displayRecords.map((record, index) => (
                                <RecordCard record={record} index={index}/>
                            ))
                        }
                        {
                            displayRecords.length === 0 &&
                            <p>Нет записей!</p>
                        }
                    </div>
                </div>
                <div className={styles.catalogPage__right}>
                    <Card>
                        <Filters records={records1.records} setRecords={setDisplayRecords}/>
                    </Card>
                </div>
            </div>
            <AddRecordModal isModalOpen={isAddRecordModalOpen} setIsModalOpen={setIsAddRecordModalOpen}/>
        </div>
    )
}
