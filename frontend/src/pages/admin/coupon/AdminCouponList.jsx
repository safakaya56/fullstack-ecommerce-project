import { useEffect, useState } from "react"
import { Popconfirm, Table, Button, Space } from 'antd';
import Container from '@mui/material/Container';
import {CLIENT_DOMAIN} from '../../../config';


function AdminCouponList() {

    const [coupons, setCoupons] = useState([]);

    const handleCoupons = async () => {
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/coupons`);

            if (response.ok) {
                const data = await response.json();
                setCoupons(data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteCoupon = async (id) => {
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/coupons/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                handleCoupons();
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleCoupons();
    }, [])

    const columns = [

        {
            title: "Code",
            dataIndex: "code",
            key: "code",

        },
        {
            title: "Discount(%)",
            dataIndex: "discountPercentage",
            key: "discountPercentage",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        title="Delete the category"
                        description="Are you sure to delete this category?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteCoupon(record._id)}
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
                dataSource={coupons}
                columns={columns}
                rowKey={(record) => record._id}
            />
        </Container>
    )
}

export default AdminCouponList