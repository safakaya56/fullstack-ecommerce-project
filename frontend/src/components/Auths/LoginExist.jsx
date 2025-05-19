import Swal from 'sweetalert2';
import "./loginexist.css"
import AuthUpdateModal from '../Modals/AuthUpdateModal'
import { useNavigate } from "react-router-dom"

function LoginExist({ email }) {

    const navigate = useNavigate();


    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("token");
            await Swal.fire({ text: "Çıkış Başarılı", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            navigate("/");
            window.location.reload();
        }
    };

    return (
        <div className='eLoginContainer shadow-sm'>
            <AuthUpdateModal email={email} />
            <button className='btn btn-outline-info p-3' onClick={() => navigate("/order")}>Siparişler</button>
            <button className='btn btn-outline-danger p-3' onClick={handleLogout}>Logout</button>
        </div>

    )
}

export default LoginExist