import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CLIENT_DOMAIN } from "../../config";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "", password: ""
    });

    const handleGetInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                await Swal.fire({ text: "Giriş Başarılı", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });


                localStorage.setItem("token", data.token);


                const base64Url = data.token.split('.')[1];
                const decodedData = JSON.parse(atob(base64Url));

                if (decodedData.role === "admin") {
                    navigate("/admin/dashboard");
                    window.location.reload();
                } else {
                    navigate("/");
                    window.location.reload();
                }
            }
            else {
                Swal.fire({ text: "Giriş Başarısız", icon: "error", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="account-column">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        <span>Email address <span className="required">*</span></span>
                        <input type="email" name='email' onChange={handleGetInput} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Password <span className="required">*</span></span>
                        <input type="password" name='password' onChange={handleGetInput} />
                    </label>
                </div>
                <p className="remember">
                    <label>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>
                    <button className="btn btn-sm">Login</button>
                </p>
                <a href="#" className="form-link">Lost your password?</a>
            </form>
        </div>
    )
}

export default Login;
