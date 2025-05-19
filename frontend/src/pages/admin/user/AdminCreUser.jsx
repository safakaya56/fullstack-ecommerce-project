import { Container } from "@mui/material"
import { useState } from "react";
import Swal from 'sweetalert2';
import {CLIENT_DOMAIN} from '../../../config';

function AdminCreUser() {


    const [users, setUsers] = useState({ username: "", email: "", password: "", role: "" });

    const handleGetInput = (e) => {
        const { name, value } = e.target;
        setUsers({ ...users, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(users)
            })

            if (response.ok) {
                await Swal.fire({ text: "Created Successfully", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }
            else {
                await Swal.fire({ text: "Oops! Already taken email or password", icon: "error", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }

        } catch (error) {
            console.error(error);
        }

    }


    return (
        <Container maxWidth="sm">
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name="username" onChange={handleGetInput} />
                </div>
                <div className="form-group mt-2">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleGetInput} />
                </div>
                <div className="form-group mt-2">
                    <label>Password</label>
                    <input type="text" className="form-control" name="password" onChange={handleGetInput} />
                </div>
                <div className="form-group mt-2">
                    <label>Role</label>
                    <select name="role" className="form-select" onChange={handleGetInput}>
                        <option value="" disabled selected>Seçiniz</option>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </Container>
    )
}

export default AdminCreUser