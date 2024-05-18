import React, {useEffect} from 'react';
import styles from './RecordPage.module.css'
import {Breadcrumb, Spin} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import RecordRecognitionText from "../../components/RecordRecognitionText/RecordRecognitionText";
import RecordInfo from "../../components/RecordInfo/RecordInfo";
import RecordSituationTable from "../../components/RecordSituationTable/RecordSituationTable";
import {useDispatch} from "react-redux";
import {getRecord} from "../../../../store/slices/recordSlice";
import {useRecord} from "../../../../hooks/use-record";


export function RecordPage(props) {
    const dispatch = useDispatch()
    const {recordId} = useParams()
    const record = useRecord()

    useEffect(() => {
        dispatch(getRecord(recordId))
    }, [])

    if (!record.record)
        return <Spin className={styles.spin}/>

    return (
        <div className={styles.recordPage}>
            <Breadcrumb
                items={[
                    {
                        title: <Link to="/">Записи разговоров</Link>,
                    },
                    {
                        title: 'Запись от ' + new Date(record.record.date).toLocaleString(),
                    }
                ]}
            />
            <div className={styles.recordPage__container}>
                <div className={styles.recordPage__left}>
                    <RecordSituationTable table={record.record.situationTable}
                                          content={JSON.parse(record.record.situationTableContent)}/>
                    <RecordRecognitionText recognitionChats={record.record.recognition_texts}/>
                </div>
                <div className={styles.recordPage__right}>
                    <RecordInfo record={record.record}/>
                </div>
            </div>
        </div>
    )
}
