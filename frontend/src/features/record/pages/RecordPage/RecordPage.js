import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import styles from './RecordPage.module.css'
import {Breadcrumb, Button, Card, Spin} from "antd";
import {Link, useParams} from "react-router-dom";
import RecordRecognitionText from "../../components/RecordRecognitionText/RecordRecognitionText";
import RecordInfo from "../../components/RecordInfo/RecordInfo";
import RecordSituationTable from "../../components/RecordSituationTable/RecordSituationTable";
import {useDispatch} from "react-redux";
import {getRecord} from "../../../../store/slices/recordSlice";
import {useRecord} from "../../../../hooks/use-record";
import {useWavesurfer} from '@wavesurfer/react'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'
import {PauseOutlined, PlayCircleOutlined, RedoOutlined, UndoOutlined} from "@ant-design/icons";


export function RecordPage(props) {
    const dispatch = useDispatch()
    const {recordId} = useParams()
    const record = useRecord()
    const containerRef = useRef(null)

    useEffect(() => {
        dispatch(getRecord(recordId))
    }, [])

    const {wavesurfer, isPlaying, currentTime} = useWavesurfer({
        container: containerRef,
        height: 50,
        waveColor: '#a4a7e3',
        progressColor: '#e21a1a',
        url: record.record?.audioSrc,
        plugins: useMemo(() => [Timeline.create()], []),
    })

    const onPlayPause = useCallback(() => {
        wavesurfer && wavesurfer.playPause()
    }, [wavesurfer])

    const onSkip = useCallback(() => {
        wavesurfer && wavesurfer.skip(5)
    }, [wavesurfer])

    const onBack = useCallback(() => {
        wavesurfer && wavesurfer.skip(-5)
    }, [wavesurfer])


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
                    <RecordSituationTable
                        table={record.record.situationTable}
                        content={JSON.parse(record.record.situationTableContent)}
                    />
                    <Card>
                        <div className={styles.playerContainer}>
                            <h2 className={styles.player__title}>Аудиозапись переговоров</h2>
                            <div className={styles.player} ref={containerRef}/>
                            <div className={styles.player__buttons}>
                                <Button
                                    onClick={onBack}
                                    icon={<UndoOutlined />}
                                />
                                <Button
                                    onClick={onPlayPause}
                                    icon={isPlaying ? <PauseOutlined/> : <PlayCircleOutlined/>}
                                />
                                <Button
                                    onClick={onSkip}
                                    icon={<RedoOutlined />}
                                />
                            </div>

                        </div>
                    </Card>
                    <RecordRecognitionText recognitionChats={record.record.recognition_texts}/>
                </div>
                <div className={styles.recordPage__right}>
                    <RecordInfo record={record.record}/>
                </div>
            </div>
        </div>
    )
}
