import "./auth.css"
import { useEffect, useState } from 'react'
import LoginExist from "./LoginExist";
import NoLogin from "./NoLogin";


function Auth() {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState();

    const handleGetToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true)
            const base64Url = token.split('.')[1];
            const decodedData = JSON.parse(atob(base64Url));
            setUser(decodedData);
        }
    }


    useEffect(() => {
        handleGetToken();
    }, [])


    return (
        <>
            {

                isLogin ?
                    (

                        < LoginExist email={user.email} />
                    )
                    : (
                        <div className="authContainer">
                            <NoLogin />
                        </div >
                    )
            }
        </>
    )
}

export default Auth