import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { CLIENT_DOMAIN } from "../../config";;

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

    const handleGetInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleRegister = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch(`${CLIENT_DOMAIN}/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                }
            )

            if (response.ok) {
                Swal.fire({ title: "Kayıt Başarılı", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false })
                // navigate("/");   
            }

            else {
                Swal.fire({ text: "Kayıt başarısız", icon: "error", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="account-column">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>
                        <span>
                            Username <span className="required">*</span>
                        </span>
                        <input type="text" name='username' onChange={handleGetInput} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>
                            Email address <span className="required">*</span>
                        </span>
                        <input type="email" name='email' onChange={handleGetInput} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>
                            Password <span className="required">*</span>
                        </span>
                        <input type="password" name='password' onChange={handleGetInput} />
                    </label>
                </div>
                <div className="privacy-policy-text remember">
                    <p>
                        Your personal data will be used to support your experience
                        throughout this website, to manage access to your account, and for
                        other purposes described in our <a href="#">privacy policy.</a>
                    </p>
                    <button className="btn btn-sm">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register