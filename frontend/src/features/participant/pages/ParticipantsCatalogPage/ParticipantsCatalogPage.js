import React, {useEffect, useState} from 'react';
import styles from './ParticipantsCatalogPage.module.css'
import {Avatar, Button, Card, Collapse, DatePicker, Spin} from "antd";
import AddRecordModal from "../../../record/components/AddRecordModal/AddRecordModal";
import {PlusOutlined} from "@ant-design/icons";
import {useParticipants} from "../../../../hooks/use-participants";
import {useDispatch} from "react-redux";
import {getParticipants} from "../../../../store/slices/participantsSlice";
import {useNavigate} from "react-router-dom";
import AddParticipantModal from "../../components/AddParticipantModal/AddParticipantModal";

const {RangePicker} = DatePicker;

const onOk = (value) => {
    console.log('onOk: ', value);
};

export function ParticipantsCatalogPage(props) {
    const dispatch = useDispatch()
    const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] = useState(false);
    const participants = useParticipants()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getParticipants())
    }, []);

    if(!participants)
        return <Spin/>

    return (
        <div className={styles.participantsCatalogPage}>
            <div className={styles.participantsCatalogPage__titleContainer}>
                <h1 className={styles.title}>Участники переговоров</h1>
                <Button
                    type="primary"
                    onClick={() => setIsAddParticipantModalOpen(true)}
                    className={styles.participantsCatalogPage__addButton}
                    size="large"
                    icon={<PlusOutlined/>}
                >
                    Добавить сотрудника
                </Button>
            </div>
            <div className={styles.participantsCatalogPage__content}>
                <Collapse
                    className={styles.participantsCatalogPage__catalog}
                    size="medium"
                    ghost={true}
                    items={
                        participants.roles.map((role, index) => {
                            return {
                                key: role.roleName,
                                label: <p className={styles.participantsCatalogPage__title}>
                                    {role.roleName}
                                    <p className={styles.participantsCatalogPage__number}>({role.participants.length})</p>
                                </p>,
                                children: <div className={styles.participantsCatalogPage__participants}>
                                    {
                                        role.participants.map(participant => (
                                            <Card onClick={() => navigate(`/participants/${participant.id}`)}>
                                                <div className={styles.participantsCatalogPage__participantCard}>
                                                    <Avatar size={64} src={participant.avatarSrc}/>
                                                    <div>
                                                        <p className={styles.participantCard__name}>
                                                            {participant.name}
                                                        </p>

                                                        {/*<p>Количество ошибок: {participant.errorsCount}</p>*/}
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                    }
                                </div>
                            }
                        })
                    }
                />
            </div>
            <AddParticipantModal isModalOpen={isAddParticipantModalOpen} setIsModalOpen={setIsAddParticipantModalOpen}/>
        </div>
    )
}
