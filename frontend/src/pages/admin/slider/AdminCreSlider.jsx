import { Container } from "@mui/material"
import { useState } from "react";
import Swal from 'sweetalert2';
import {CLIENT_DOMAIN} from '../../../config';

function AdminCreSlider() {


    const [slider, setSlider] = useState({ image: "" });

    const handleGetInput = (e) => {
        const { name, value } = e.target;
        setSlider({ ...slider, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/slider`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(slider)
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
                    <label>İmage Link (URL)</label>
                    <input type="text" className="form-control" name="image" onChange={handleGetInput} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </Container>
    )
}

export default AdminCreSlider