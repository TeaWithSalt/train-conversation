import React, {useEffect, useState} from 'react';
import styles from "./Filters.module.css"
import {Avatar, DatePicker, Select, Space, Spin, Tooltip} from "antd";
import {useDispatch} from "react-redux";
import {getParticipants} from "../../../../store/slices/participantsSlice";
import {useParticipants} from "../../../../hooks/use-participants";
import {getSituations} from "../../../../store/slices/situationTablesSlice";
import {useSituations} from "../../../../hooks/use-situations";
import './style.css'

const {RangePicker} = DatePicker;

export default function Filters({
                                    withParticipants = true,
                                    ...props
                                }) {
    const dispatch = useDispatch()
    const [participantsFilter, setParticipantsFilter] = useState([])
    const [situationsFilter, setSituationsFilter] = useState([])

    const participants = useParticipants()
    const situations = useSituations()

    useEffect(() => {
        dispatch(getParticipants())
        dispatch(getSituations())
    }, [dispatch]);

    useEffect(() => {
        let tempRecords = props.records || []

        if (participantsFilter.length > 0)
            tempRecords = tempRecords.filter(record => record.participants.reduce((accumulator, participant) => accumulator + (participantsFilter.includes(participant.id) ? 1 : 0), 0) >= participantsFilter.length)

        if (situationsFilter.length > 0)
            tempRecords = tempRecords.filter(record => situationsFilter.includes(record.situationTable.id), 0)

        props.setRecords(tempRecords)
    }, [participantsFilter, situationsFilter, props.records])


    if (!participants || !situations || !props.records)
        return <Spin/>

    const onChangeParticipantsFilter = (values) => {
        setParticipantsFilter(values)
    }

    const onChangeSituationsFilter = (values) => {
        setSituationsFilter(values)
    }

    return (
        <div className={`${styles.filters} Filters`}>
            <RangePicker
                allowEmpty={[false, true]}
                showTime={{format: 'HH:mm:ss'}}
                format="YYYY-MM-DD HH:mm:ss"
                onChange={(value, dateString) => {
                    console.log('Selected Time: ', value);
                    console.log('Formatted Selected Time: ', dateString);
                }}
                onOk={() => {
                }}
                className={styles.rangePicker}
                placeholder={["Разговоры от", "Разговоры до"]}
            />
            {withParticipants && <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="Участники разговора"
                value={participantsFilter}
                maxTagCount={1}
                maxTagPlaceholder={(omittedValues) => (
                    <Tooltip
                        title={
                            <div className={styles.extraOptionsList}>
                                {omittedValues
                                    .map(({label}) => <span>{label}</span>)
                                }
                            </div>
                        }
                    >
                        <span className={styles.extraOptions}>+{omittedValues.length}</span>
                    </Tooltip>
                )}
                className={`select ${styles.select}`}
                onChange={onChangeParticipantsFilter}
                options={participants.roles.map(role => ({
                    label: <span>{role.roleName}</span>,
                    title: role.roleName,
                    options: role.participants.map(participant => ({
                        label: <span>{participant.name}</span>,
                        value: participant.id,
                        avatarSrc: participant.avatarSrc
                    }))
                }))}
                maxCount="2"
                allowClear={true}
                optionRender={(option) => (
                    <Space>
                        <Avatar size={"small"} src={option.data.avatarSrc} alt=""/>
                        {option.data.label}
                    </Space>
                )}
            />}
            <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="Ситуации"
                onChange={onChangeSituationsFilter}
                value={situationsFilter}
                options={situations.situations.map(situation => ({
                    value: situation.id,
                    label: situation.name
                }))}
                className={`${styles.select} lastSelect select`}
                allowClear={true}
                maxTagCount={1}
                maxTagPlaceholder={(omittedValues) => (
                    <Tooltip
                        title={
                            <div className={styles.extraOptionsList}>
                                {omittedValues
                                    .map(({label}) => <span>{label}</span>)
                                }
                            </div>
                        }
                    >
                        <span className={styles.extraOptions}>+{omittedValues.length}</span>
                    </Tooltip>
                )}
            />
        </div>
    );
};
