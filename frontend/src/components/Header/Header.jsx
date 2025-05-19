import "./header.css";
import { useNavigate } from 'react-router-dom';
import HeaderPages from './HeaderPages';
import HeaderNavigation from "./HeaderNavigation";


function Header() {

    const navigate = useNavigate();

    return (
        <div className='headerContainer'>
            <div className='advert'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, deleniti!</p>
            </div>
            <div className='nav'>
                <div className='logo'>
                    <a href="#"
                        onClick={() => navigate("/")}>LOGO</a>
                </div>
                <HeaderPages />
                <HeaderNavigation />
            </div>
        </div>
    );
}

export default Header;
