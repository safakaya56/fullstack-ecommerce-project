import { useEffect, useState } from "react"
import { Popconfirm, Table, Button } from 'antd';
import Container from '@mui/material/Container';
import {CLIENT_DOMAIN} from '../../../config';




function AdminUserListPage() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        handleUsers();
    }, [])

    const handleUsers = async () => {
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/users`);

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteUser = async (userEmail) => {

        const response = await fetch(`${CLIENT_DOMAIN}/users/${userEmail}`, {
            method: "DELETE"
        });

        if (response.ok) {
            handleUsers();
        }
    }

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Popconfirm
                    title="Delete the user"
                    description="Are you sure to delete this user?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDeleteUser(record.email)}
                >
                    <Button type="primary" danger style={{ width: "80px" }}>Delete</Button>
                </Popconfirm>

            )
        },

    ];



    return (
        <Container maxWidth="md">

            <Table
                style={{ paddingTop: "50px" }}
                dataSource={users}
                columns={columns}
                rowKey={(item) => item._id}
            />
        </Container>
    )
}

export default AdminUserListPage