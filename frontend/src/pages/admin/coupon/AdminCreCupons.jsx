import { Container } from "@mui/material"
import { useState } from "react";
import Swal from 'sweetalert2';
import {CLIENT_DOMAIN} from '../../../config';

function AdminCreCupons() {


    const [coupons, setCoupons] = useState({ code: "", discountPercentage: "" });

    const handleGetInput = (e) => {
        const { name, value } = e.target;
        setCoupons({ ...coupons, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/coupons`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(coupons)
            })

            if (response.ok) {
                await Swal.fire({ text: "Created Successfully", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }
            else {
                await Swal.fire({ text: "Oops! There is an error", icon: "error", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }

        } catch (error) {
            console.error(error);
        }

    }


    return (
        <Container maxWidth="sm">
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Code</label>
                    <input type="text" className="form-control" name="code" onChange={handleGetInput} />
                </div>
                <div className="form-group mt-2">
                    <label>Discount(%)</label>
                    <input type="number" className="form-control" name="discountPercentage" onChange={handleGetInput} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </Container>
    )
}

export default AdminCreCupons