import { Button, Result } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {CLIENT_DOMAIN} from '.././config';

function SuccesPage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState();

    const handleGetEmail = () => {
        const Base64Url = localStorage.getItem("token").split('.')[1];
        const decodedData = JSON.parse(atob(Base64Url));
        const email = decodedData.email;
        setEmail(email);
    }

    const orderSaveToDb = async () => {

        const cart = JSON.parse(localStorage.getItem("cart"));
        for (const item of cart) {
            const data = {
                ...item,
                customer_email: email
            }
            try {
                const res = await fetch(`${CLIENT_DOMAIN}/order`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
            }
            catch (error) {
                console.error(error);
            }
        }

        localStorage.removeItem("cart");
        window.location.reload();
    }



    useEffect(() => {
        handleGetEmail();
    }, [])


    return (
        <Result
            style={{ margin: "150px auto" }}
            status="success"
            title="Successfully Purchased!"
            subTitle="Order number: 201718281882818288."
            extra={[
                <Button type="primary" key="console" onClick={() => { orderSaveToDb(); navigate("/"); }}>
                    Go Home
                </Button>
            ]}
        />
    )
}

export default SuccesPage