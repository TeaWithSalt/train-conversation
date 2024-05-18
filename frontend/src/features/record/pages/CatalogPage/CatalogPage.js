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
    const records = useRecords()

    useEffect(() => {
        dispatch(getRecords())
    }, [])


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
                        <Filters records={records.records} setRecords={setDisplayRecords}/>
                    </Card>
                </div>
            </div>
            <AddRecordModal isModalOpen={isAddRecordModalOpen} setIsModalOpen={setIsAddRecordModalOpen}/>
        </div>
    )
}
