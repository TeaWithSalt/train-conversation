import React, {useState} from 'react';
import styles from './CatalogPage.module.css'
import RecordCard from "../../components/RecordCard/RecordCard";
import {Avatar, Button, Card, DatePicker, Select, Space} from "antd";
import AddRecordModal from "../../../../components/AddRecordModal/AddRecordModal";
import {PlusOutlined} from "@ant-design/icons";

const {RangePicker} = DatePicker;

const onOk = (value) => {
    console.log('onOk: ', value);
};

export function CatalogPage(props) {
    const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);

    const participants = [
        {
            label: <span>Машинисты</span>,
            title: 'Машинисты',
            options: [
                {
                    label: <span>Иванов Иван</span>,
                    value: 'Jack',
                    avatarSrc: "https://avatars.githubusercontent.com/u/115563530?v=4"
                },
                {label: <span>Галимзянов Айнур</span>, value: '1'},
                {label: <span>Галимзянов Айнур</span>, value: '2'},
            ],
        },
        {
            label: <span>Диспетчеры</span>,
            title: 'Диспетчеры',
            options: [
                {label: <span>Chloe</span>, value: 'Chloe'},
                {label: <span>Lucas</span>, value: 'Lucas'},
            ],
        },
    ]

    const situations = [
        {
            label: 'Безостановочный пропуск поезда по главному железнодорожному пути железнодорожной станции при открытых входном (маршрутных) и выходном светофорах на однопутный перегон или по правильному железнодорожному пути двухпутного перегона при нормальном действии автоблокировки (полуавтоматической блокировки) и отсутствии необходимости в передаче дополнительных предупреждений',
            value: '1'
        },
        {
            label: 'Прием поезда по пригласительному сигналу на входном (маршрутном) светофоре',
            value: '2'
        },
    ]


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
                <h1>Записи разговоров</h1>
                <Button
                    type="default"
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
                            records &&
                            records.map((record, index) => (
                                <RecordCard record={record} index={index}/>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.catalogPage__right}>
                    <Card>
                        <div className={styles.catalogPage__filters}>
                            <h3>Фильтры</h3>
                            <RangePicker
                                allowEmpty={[false, true]}
                                showTime={{format: 'HH:mm:ss'}}
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={(value, dateString) => {
                                    console.log('Selected Time: ', value);
                                    console.log('Formatted Selected Time: ', dateString);
                                }}
                                onOk={onOk}
                                placeholder={["Разговоры от", "Разговоры до"]}
                            />
                            <Select
                                mode="multiple"
                                style={{width: '100%'}}
                                placeholder="Участники разговора"
                                // onChange={handleChange}
                                options={participants}
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
                                options={situations}
                                allowClear={true}
                            />
                        </div>
                    </Card>
                </div>
            </div>
            <AddRecordModal isModalOpen={isAddRecordModalOpen} setIsModalOpen={setIsAddRecordModalOpen}/>
        </div>
    )
}
