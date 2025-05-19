import { useEffect, useState } from "react"
import { Table } from 'antd';
import Container from '@mui/material/Container';
import EmptyData from "../Empty/EmptyData";
import { CLIENT_DOMAIN } from "../../config";

function Order() {
    const [data, setData] = useState([]);
    const [mainData, setMainData] = useState([]);

    const handleGetOrders = async () => {
        const customer = JSON.parse(atob(localStorage.getItem("token").split('.')[1]));
        if (customer) {
            try {
                const res = await fetch(`${CLIENT_DOMAIN}/order/${customer?.email}`);
                if (res.ok) {
                    const data = await res.json();
                    setData(data);
                    const groupedData = groupByDate(data);
                    setMainData(groupedData);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };


    const groupByDate = (data) => {
        const grouped = {};

        data.forEach(item => {
            const date = new Date(item.createdAt).toLocaleDateString('tr-TR');
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(item);
        });

        return Object.values(grouped);
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
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Color",
            dataIndex: "selected_color",
            key: "selected_color",
        }, {
            title: "Size",
            dataIndex: "selected_size",
            key: "selected_size",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
    ];

    useEffect(() => {
        handleGetOrders();
    }, []);

    return (
        <Container maxWidth="lg" style={{ margin: "100px auto" }}>
            {mainData.length > 0 ? (
                mainData.map((group, index) => (
                    <div key={index}>
                        <h3>{`Orders on ${new Date(group[0].createdAt).toLocaleDateString('tr-TR')}`}</h3>
                        <Table
                            style={{ paddingTop: "20px" }}
                            dataSource={group}
                            columns={columns}
                            rowKey={(record) => record._id}
                            pagination={{ pageSize: 3 }}
                        />
                    </div>
                ))
            ) : (
                <div>
                    <EmptyData />
                </div>
            )
            }
        </Container>
    );
}

export default Order;
