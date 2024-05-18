import React from 'react';
import {Card, Table} from "antd";
import {useNavigate} from "react-router-dom";
import styles from "./RecordSituationTable.module.css"

export default function RecordSituationTable(props) {
    const navigate = useNavigate()

    const situationTable = {
        name: "Перегон поездов",
        table: [
            {
                label: "Номер поезда",
                value: "22"
            },
            {
                label: "Приближение к станции",
                value: "Погромное "
            },
            {
                label: "Станция направления",
                value: "Сорочинская"
            },
            {
                label: "Путь следования",
                value: "По Тоцкой - первый путь"
            }
        ]

    }

    return (
        <Card>
            <h2>
                Извлечённые данные по ситуации: {situationTable.name}
            </h2>
            <div className={styles.situationTable}>
                <Table
                    showHeader={false}
                    pagination={false}
                    bordered={true}
                    columns={[
                        {
                            // title: 'Поле',
                            dataIndex: 'label',
                            key: 'label',
                            width: "150px"
                        },
                        {
                            // title: 'Age',
                            dataIndex: 'value',
                            key: 'value',
                        }
                    ]}
                    dataSource={situationTable.table}
                />
                {/*<Descriptions*/}
                {/*    column={1}*/}
                {/*    items={*/}
                {/*        situationTable.table.map((field, index) => ({*/}
                {/*            key: "situationTable" + index,*/}
                {/*            label: field.label,*/}
                {/*            children: field.value,*/}
                {/*        }))*/}
                {/*    }/>*/}
            </div>
        </Card>
    );
};
