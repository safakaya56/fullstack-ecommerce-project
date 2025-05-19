import { useEffect, useState } from "react";
import { Popconfirm, Table, Button, Space, Modal } from 'antd';
import Container from '@mui/material/Container';
import {CLIENT_DOMAIN} from '../../../config';

function AdminOrderList() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

   
    const handleGetOrders = async () => {
        try {
            const res = await fetch(`${CLIENT_DOMAIN}/order`);
            if (res.ok) {
                const data = await res.json();
                setData(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteOrder = async (customer_email) => {
        const response = await fetch(`${CLIENT_DOMAIN}/order/${customer_email}`, {
            method: "DELETE"
        });

        if (response.ok) {
            handleGetOrders();
        }
    };

    const showModal = (record) => {
        setSelectedOrder(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const columns = [
        {
            title: "İmages",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <img
                    src={image}
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
            title: "Customer Email",
            dataIndex: "customer_email",
            key: "customer_email",
        },
        {
            title: "Order Time",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => (
                new Date(createdAt).toLocaleDateString('tr')
            )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type="primary" style={{ width: "80px" }} onClick={() => showModal(record)}>
                        Detaylar
                    </Button>
                    <Popconfirm
                        title="Sipariş Tamamlandı"
                        description="Bu siparişi tamamladınız mı?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteOrder(record.customer_email)}
                    >
                        <Button type="primary" style={{ width: "80px" }}>Tamamla</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    useEffect(() => {
        handleGetOrders();
    }, []);

    return (
        <Container maxWidth="lg" style={{ margin: "100px auto" }}>
            <Table
                style={{ paddingTop: "20px" }}
                dataSource={data}
                columns={columns}
                rowKey={(record) => record._id}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                footer={false}
                open={isModalOpen}
                onCancel={handleCancel}
            >
                {selectedOrder && (
                    <>
                        <p><strong>Price: </strong>{selectedOrder.price}</p>
                        <p><strong>Quantity: </strong>{selectedOrder.quantity}</p>
                        <p><strong>Color: </strong>{selectedOrder.selected_color}</p>
                        <p><strong>Size: </strong>{selectedOrder.selected_size}</p>
                    </>
                )}
            </Modal>
        </Container>
    );
}

export default AdminOrderList;
