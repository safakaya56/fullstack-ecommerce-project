import { useEffect, useState } from "react"
import { Popconfirm, Table, Button, Space } from 'antd';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import {CLIENT_DOMAIN} from '../../../config';

function AdminCategoryListPage() {

    const [categories, setCategories] = useState([]);

    const navigate = useNavigate()


    useEffect(() => {
        handleCategories();
    }, [])

    const handleCategories = async () => {
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/categories`);

            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteCategory = async (categoryID) => {

        const response = await fetch(`${CLIENT_DOMAIN}/categories/${categoryID}`, {
            method: "DELETE"
        });

        if (response.ok) {
            handleCategories();
        }
    }


    const columns = [

        {
            title: "İmages",
            dataIndex: "img",
            key: "img",
            render: (img) => (
                <img
                    src={img}
                    alt="image"
                    style={{ width: "70px", height: "70px" }}
                />
            )
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type="primary" style={{ width: "80px" }} onClick={() => navigate(`update/${record._id}`)}>Update</Button>
                    <Popconfirm
                        title="Delete the category"
                        description="Are you sure to delete this category?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteCategory(record._id)}
                    >
                        <Button type="primary" danger style={{ width: "80px" }}>Delete</Button>
                    </Popconfirm>
                </Space>



            )
        },

    ];


    return (
        <Container maxWidth="md">

            <Table
                style={{ paddingTop: "50px" }}
                dataSource={categories}
                columns={columns}
                rowKey={(record) => record._id}
            />
        </Container>
    )
}

export default AdminCategoryListPage