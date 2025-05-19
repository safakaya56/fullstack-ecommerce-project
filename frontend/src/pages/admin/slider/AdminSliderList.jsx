import { useEffect, useState } from "react"
import { Popconfirm, Table, Button, Space } from 'antd';
import Container from '@mui/material/Container';
import {CLIENT_DOMAIN} from '../../../config';


function AdminSliderList() {

    const [slider, setSlider] = useState([]);

    const handleSliders = async () => {
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/slider`);

            if (response.ok) {
                const data = await response.json();
                setSlider(data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteSlider = async (id) => {
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/slider/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                handleSliders();
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleSliders();
    }, [])

    const columns = [

        {
            title: "İmages",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <Space>
                    <img src={image} alt="" style={{ width: "290px", height: "150px", objectFit: "contain" }} />
                </Space>
            )

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
                        onConfirm={() => handleDeleteSlider(record._id)}
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
                dataSource={slider}
                columns={columns}
                rowKey={(record) => record._id}
            />
        </Container>
    )
}

export default AdminSliderList