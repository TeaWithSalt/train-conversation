import React, {useEffect} from 'react';
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

    useEffect(() => {
        dispatch(getParticipants())
        dispatch(getSituations())
    }, []);

    const participants = useParticipants()
    const situations = useSituations()

    if (!participants || !situations)
        return <Spin/>

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
                // onChange={handleChange}
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
                // onChange={handleChange}
                options={situations.situations.map(situation => ({
                    value: situation.id,
                    label: situation.name
                }))}
                allowClear={true}
            />
        </div>
    );
};
