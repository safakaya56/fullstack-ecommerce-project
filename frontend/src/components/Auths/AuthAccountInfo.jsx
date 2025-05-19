import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { CLIENT_DOMAIN } from "../../config";


function AuthAccountInfo({ email }) {

    const [payload, setPayload] = useState({
        username: "",
        email: "",
        oldPassword: "",
        password: ""
    });



    const handlegetAcoount = async () => {
        try {
            const res = await fetch(`${CLIENT_DOMAIN}/users/${email}`);
            if (res.ok) {
                let temp = {};
                const data = await res.json();
                temp = { ...data, oldPassword: data?.password, password: "" }
                setPayload(temp);
            }

        } catch (error) {
            console.error(error)
        }

    }

    const handleGetInput = (e) => {
        const { name, value } = e.target;
        if (name == "username") {
            setPayload({ ...payload, username: value })
        }
        if (name == "email") {
            setPayload({ ...payload, email: value })
        }
        if (name == "oldPassword") {
            setPayload({ ...payload, oldPassword: value })
        }
        if (name == "password") {
            setPayload({ ...payload, password: value })
        }
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/users/${payload?.email}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                await Swal.fire({ text: "Güncelleme Başarılı", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }
            else {
                Swal.fire({ text: "Güncelleme Başarısız!", icon: "error", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }

        } catch (error) {
            console.error(error)
            Swal.fire({ text: "Server Error", icon: "error", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
        }
    }

    useEffect(() => {
        if (email) {
            handlegetAcoount();
        }

    }, [email])



    return (
        <div className="p-4">
            {
                payload &&
                <form className="mt-5" onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" value={payload.username} onChange={handleGetInput} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={payload.email} onChange={handleGetInput} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Your Old Password</label>
                        <input type="text" className="form-control" name="oldPassword" onChange={handleGetInput} />
                    </div>
                    <div className="form-group mt-2">
                        <label>New Password</label>
                        <input type="text" className="form-control" name="password" onChange={handleGetInput} />
                        <span>Şifre yenilemek için eski şifreyi doğru bir şekilde girmelisiniz.</span>
                    </div>
                    <button type="submit" className="btn btn-success mt-4">Update</button>
                </form>
            }
        </div>
    )
}

export default AuthAccountInfo