import { Container } from "@mui/material"
import { useState } from "react";
import Swal from 'sweetalert2';
import {CLIENT_DOMAIN} from '../../../config';

function AdminCreCategory() {

    const [category, setCategory] = useState({ title: "", img: "" });

    const handleGetInput = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/categories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(category)
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
                    <label>Title</label>
                    <input type="text" className="form-control" placeholder="Enter a title" name="title" onChange={handleGetInput} />
                </div>
                <div className="form-group mt-2">
                    <label>İmage (URL)</label>
                    <input type="text" className="form-control" placeholder="İmage's URL" name="img" onChange={handleGetInput} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </Container>
    )
}

export default AdminCreCategory