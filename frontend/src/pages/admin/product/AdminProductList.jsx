import { useEffect, useState } from "react"
import { Popconfirm, Table, Button, Space } from 'antd';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import {CLIENT_DOMAIN} from '../../../config';

function AdminProductList() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate()


    useEffect(() => {
        handleCategories();
    }, [])

    const handleCategories = async () => {
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/product`);

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteCategory = async (productID) => {

        const response = await fetch(`${CLIENT_DOMAIN}/product/${productID}`, {
            method: "DELETE"
        });

        if (response.ok) {
            handleCategories();
        }
    }


    const columns = [

        {
            title: "İmages",
            dataIndex: "image",
            key: "image",
            render: (img) => (
                <img
                    src={img}
                    alt="image"
                    style={{ width: "70px", height: "70px" }}
                />
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Category",
            dataIndex: "category",
            render: (_, record) => record.category?.title ?? "N/A"
        },

        {
            title: "Price",
            dataIndex: "currentPrice",
            render: (_, record) => record.price?.current ?? "N/A"
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type="primary" style={{ width: "80px" }} onClick={() => navigate(`update/${record._id}`)}>Update</Button>
                    <Popconfirm
                        title="Delete the product"
                        description="Are you sure to delete this product?"
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
                dataSource={products}
                columns={columns}
                rowKey={(record) => record._id}
            />
        </Container>
    )
}

export default AdminProductList