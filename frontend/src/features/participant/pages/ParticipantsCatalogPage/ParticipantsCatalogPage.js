import React, {useState} from 'react';
import styles from './ParticipantsCatalogPage.module.css'
import {Avatar, Button, Card, Collapse, DatePicker} from "antd";
import AddRecordModal from "../../../../components/AddRecordModal/AddRecordModal";
import {PlusOutlined} from "@ant-design/icons";

const {RangePicker} = DatePicker;

const onOk = (value) => {
    console.log('onOk: ', value);
};

export function ParticipantsCatalogPage(props) {
    const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] = useState(false);

    const participants = [
        {
            id: 1,
            name: "Галимзянов Айнур",
            role: "Диспетчер",
            avatarSrc: "https://i.pravatar.cc/150?img=12",
            errorsCount: 30
        },
        {
            id: 2,
            name: "Килязова Юния Сергеевна",
            role: "Машинист",
            avatarSrc: "https://i.pravatar.cc/150?img=44",
            errorsCount: 20
        }
    ]

    const roles = [...new Set(participants.map(participant => participant.role))]


    return (
        <div className={styles.participantsCatalogPage}>
            <div className={styles.participantsCatalogPage__titleContainer}>
                <h1>Участники разговоров</h1>
                <Button
                    type="default"
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
                    defaultActiveKey={roles}
                    size="medium"
                    ghost={true}
                    items={
                        roles.map((role, index) => {
                            const roleParticipants = participants.filter(participant => participant.role === role)
                            return {
                                key: role,
                                label: <p className={styles.participantsCatalogPage__title}>
                                    {role}
                                    <p className={styles.participantsCatalogPage__number}>({roleParticipants.length})</p>
                                </p>,
                                children: <div className={styles.participantsCatalogPage__participants}>
                                    {
                                        roleParticipants.map(participant => (
                                            <Card>
                                                <div className={styles.participantsCatalogPage__participantCard}>
                                                    <Avatar size={64} src={participant.avatarSrc}/>
                                                    <div>
                                                        <p className={styles.participantCard__name}>
                                                            {participant.name}
                                                        </p>

                                                        <p>Количество ошибок: {participant.errorsCount}</p>
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
            <AddRecordModal isModalOpen={isAddParticipantModalOpen} setIsModalOpen={setIsAddParticipantModalOpen}/>
        </div>
    )
}
