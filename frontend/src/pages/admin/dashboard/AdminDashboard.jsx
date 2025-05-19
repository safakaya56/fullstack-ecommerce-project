import "./dashboard.css"
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {CLIENT_DOMAIN} from '../../../config';

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [productsName, setProductsName] = useState({});
    const [times, setTimes] = useState([]);
    const [prices, setPrices] = useState([]);

    const handleGetOrders = async () => {
        try {
            const res = await fetch(`${CLIENT_DOMAIN}/order`);
            if (res.ok) {
                const data = await res.json();
                setOrder(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const calculateTotalPerDate = (orderData) => {
        const totalsByDate = {};
        orderData.forEach(item => {
            const date = new Date(item.createdAt).toLocaleDateString('tr');
            const total = Number(item.price) * Number(item.quantity);
            totalsByDate[date] = (totalsByDate[date] || 0) + total;
        });
        setTimes(Object.keys(totalsByDate));
        setPrices(Object.values(totalsByDate));
    };

    const uniqueNamesProduct = () => {
        const nameCounts = order.reduce((acc, o) => {
            acc[o.name] = (acc[o.name] || 0) + 1;
            return acc;
        }, {});
        setProductsName(nameCounts);
    };

    const pieData = {
        labels: Object.keys(productsName),
        datasets: [{
            data: Object.values(productsName),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#BA68C8'],
        }],
    };

    const pieData2 = {
        labels: times,
        datasets: [{
            data: prices,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#BA68C8'],
        }],
    };

    useEffect(() => {
        handleGetOrders();
    }, []);

    useEffect(() => {
        if (order.length > 0) {
            calculateTotalPerDate(order);
            uniqueNamesProduct();
            const total = order.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            setTotalPrice(total);
        }
    }, [order]);

    return (
        <div className="dashboard-container">
            <div className="chart-box">
                <h4 className="chart-title">Ürünlere Göre Sipariş</h4>
                <Pie data={pieData} />
            </div>

            <div className="chart-box">
                <h4 className="chart-title">Tarihlere Göre Sipariş</h4>
                <Pie data={pieData2} />
            </div>
        </div>
    );
}

export default AdminDashboard;
