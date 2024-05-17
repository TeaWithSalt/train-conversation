import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Layout} from "antd";
import {useAuth} from "../../hooks/use-auth";
import Header from "../Header/Header";
import AddRecordModal from "../AddRecordModal/AddRecordModal";

export default function MainLayout() {
    const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
    const navigate = useNavigate()
    const auth = useAuth()

    return (
        <Layout>
            <Layout.Header style={{display: 'flex', alignItems: 'center', backgroundColor: "white"}}>
                <Header openAddRecordModal={() => setIsAddRecordModalOpen(true)}/>
            </Layout.Header>
            <Layout.Content style={{padding: '0 48px', height: "100vh"}}>
                <div>
                    Content
                </div>
            </Layout.Content>
            <AddRecordModal isModalOpen={isAddRecordModalOpen} setIsModalOpen={setIsAddRecordModalOpen}/>
        </Layout>
    )
};
