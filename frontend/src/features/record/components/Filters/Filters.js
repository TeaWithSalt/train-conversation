import React, {useEffect, useState} from 'react';
import styles from "./Filters.module.css"
import {Avatar, DatePicker, Select, Space, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getParticipants} from "../../../../store/slices/participantsSlice";
import {useParticipants} from "../../../../hooks/use-participants";
import {getSituations} from "../../../../store/slices/situationTablesSlice";
import {useSituations} from "../../../../hooks/use-situations";

const {RangePicker} = DatePicker;

export default function Filters(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [participantsFilter, setParticipantsFilter] = useState([])
    const [situationsFilter, setSituationsFilter] = useState([])

    const participants = useParticipants()
    const situations = useSituations()

    useEffect(() => {
        dispatch(getParticipants())
        dispatch(getSituations())
    }, []);

    useEffect(() => {
        let tempRecords = props.records || []

        if (participantsFilter.length > 0)
            tempRecords = tempRecords.filter(record => record.participants.reduce((accumulator, participant) => accumulator + (participantsFilter.includes(participant.id) ? 1 : 0), 0) >= participantsFilter.length)

        if (situationsFilter.length > 0)
            tempRecords = tempRecords.filter(record => situationsFilter.includes(record.situationTable.id), 0)

        props.setRecords(tempRecords)
    }, [props.records, participantsFilter, situationsFilter])


    if (!participants || !situations || !props.records)
        return <Spin/>

    const onChangeParticipantsFilter = (values) => {
        setParticipantsFilter(values)
    }

    const onChangeSituationsFilter = (values) => {
        setSituationsFilter(values)
    }

    return (
        <div className={styles.filters}>
            <h3>Фильтры</h3>
            <RangePicker
                allowEmpty={[false, true]}
                showTime={{format: 'HH:mm:ss'}}
                format="YYYY-MM-DD HH:mm:ss"
                onChange={(value, dateString) => {
                    console.log('Selected Time: ', value);
                    console.log('Formatted Selected Time: ', dateString);
                }}
                onOk={() => {}}
                placeholder={["Разговоры от", "Разговоры до"]}
            />
            <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="Участники разговора"
                value={participantsFilter}
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
            />
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
                allowClear={true}
            />
        </div>
    );
};
