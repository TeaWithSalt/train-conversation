import React, {useEffect, useState} from 'react';
import styles from './RecordCatalogPage.module.css'
import RecordCard from "../../../../components/RecordCard/RecordCard";
import {Button} from "antd";
import AddRecordModal from "../../../../components/AddRecordModal/AddRecordModal";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import Filters from "../../components/Filters/Filters";
import {useRecords} from "../../../../hooks/use-records";
import {getRecords} from "../../../../store/slices/recordsSlice";
import {ReactComponent as Empty} from "../../../../assets/images/Empty.svg";


export function RecordCatalogPage(props) {
    const dispatch = useDispatch()
    const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
    const [displayRecords, setDisplayRecords] = useState([])
    const records = useRecords()

    useEffect(() => {
        dispatch(getRecords())
    }, [dispatch])

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
                <Filters records={records.records} setRecords={setDisplayRecords}/>
                <div className={styles.catalogPage__records}>
                    {
                        displayRecords && displayRecords.length > 0 &&
                        displayRecords.map((record, index) => (
                            <RecordCard record={record} index={index}/>
                        ))
                    }
                    {
                        displayRecords.length === 0 &&
                        <Empty width={150} height={165} className={styles.empty}/>
                    }
                </div>
            </div>
            <AddRecordModal isModalOpen={isAddRecordModalOpen} setIsModalOpen={setIsAddRecordModalOpen}/>
        </div>
    )
}
