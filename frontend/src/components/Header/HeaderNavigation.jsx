import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { CiHeart, CiShoppingBasket } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { RiAdminLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { openModal } from '../../redux/SearchModalSlice';


function HeaderNavigation() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false)
    const [admin, setAdmin] = useState(false)
    const { products } = useSelector((store) => store.cart)
    const totalCount = Number(products.reduce((total, product) => total + product.quantity, 0));


    const displayAdminPanelLogo = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true)
            const base64Url = token.split('.')[1];
            const decodedData = JSON.parse(atob(base64Url))
            if (decodedData.role == "admin") {
                setAdmin(true)
            }
        }
    }

    useEffect(() => {
        displayAdminPanelLogo();
    }, [admin])


    const reload = () => {
        window.location.reload();
    };


    return (
        <>
            <div className='icons'>
                <CgProfile className='icon' onClick={() => navigate("/auth")} />
                <IoMdSearch className='icon' onClick={() => dispatch(openModal())} />
                <CiHeart className={`icon ${isLogin ? `d-flex` : `d-none`}`} onClick={() => navigate("/favourite")} />
                <Badge badgeContent={totalCount} color='info'>
                    <CiShoppingBasket className='icon' onClick={() => navigate("/cart")} />
                </Badge>
                <RiAdminLine className={`icon ${admin ? `d-flex` : `d-none`}`} onClick={() => { navigate("/admin/dashboard"); reload() }} />
            </div>

            <div className='dropdownMenu'>
                <Badge badgeContent={totalCount} color='info' style={{ padding: "2px" }}>
                    <IoMenu className='dropdownMenuIcon' />
                </Badge>
                <ul className='dropdownMenuItems shadow-lg'>
                    <li onClick={() => navigate("/auth")}>Auth</li>
                    <li onClick={() => dispatch(openModal())}>Search</li>
                    <li className={`${isLogin ? `d-flex` : `d-none`}`} onClick={() => navigate("/favourite")}>Favourites</li>
                    <Badge badgeContent={totalCount} color='info'>
                        <li onClick={() => navigate("/cart")}>Cart</li>
                    </Badge>
                    <li className={`${admin ? `d-flex` : `d-none`}`} onClick={() => navigate("/admin/dashboard")}>Admin Panel</li>
                </ul>
            </div >
        </>
    )
}

export default HeaderNavigation