import { IoChevronDown } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function HeaderPages() {

    const navigate = useNavigate();

    return (
        <div className='pages'>
            <ul>
                <li className='home-link' onClick={() => navigate("/")}>HOME <IoChevronDown />
                    <div className="menu-dropdown">
                        <ul className='shadow-lg p-3'>
                            <li><a href="#">Home Clean</a></li>
                            <li><a href="#">Home Collection</a></li>
                            <li><a href="#">Home Minimal</a></li>
                            <li><a href="#">Home Modern</a></li>
                            <li><a href="#">Home Parallax</a></li>
                            <li><a href="#">Home Strong</a></li>
                            <li><a href="#">Home Style</a></li>
                            <li><a href="#">Home Unique</a></li>
                            <li><a href="#">Home RTL</a></li>
                        </ul>
                    </div>
                </li>
                <li className="shop-link">SHOP <IoChevronDown />
                    <div className="menu-dropdown">
                        <ul className='shadow-lg p-3'>
                            <li><a href="#">Shop Standard</a></li>
                            <li><a href="#">Shop Full</a></li>
                            <li><a href="#">Shop Categories</a></li>
                            <li><a href="#">Shop List</a></li>
                            <li><a href="#">Hover Style 1</a></li>
                            <li><a href="#">Hover Style 2</a></li>
                            <li><a href="#">Hover Style 3</a></li>
                        </ul>
                    </div>
                </li>
                <li>BLOG</li>
                <li onClick={() => navigate("/contact")}>CONTACT</li>
            </ul>
        </div>

    )
}

export default HeaderPages