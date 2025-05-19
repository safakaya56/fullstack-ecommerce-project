import { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { CgArrowTopRight } from "react-icons/cg";
import { MdDiscount } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import Swal from 'sweetalert2';
import { CLIENT_DOMAIN } from "../../config";

function ProductsItem({ product }) {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [lastPrice, setLastPrice] = useState();

    const getIsLogin = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
        }
    }

    const handleDiscount = () => {
        const result = Number(product.price.current - ((product.price.current * product.price.discount) / 100));
        setLastPrice(result);
    }

    const likedProduct = async () => {
        if (isLogin == true) {
            let { _id, name, image, price } = product;
            let likedProductItem = { id: _id, name, image, price };
            const user = JSON.parse(atob(localStorage.getItem("token").split('.')[1]))
            try {
                const res = await fetch(`${CLIENT_DOMAIN}/favourite/${user?.email}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(likedProductItem)
                });
                if (res.ok) {
                    const data = await res.json();
                    await Swal.fire({ text: "Favorilere Eklendi", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
                }
                else {
                    Swal.fire({ text: "Ürün Zaten Ekli", icon: "info", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
                }

            } catch (error) {

            }
        }
        else {
            Swal.fire({ text: "Ürünü Favorilere Kaydetmek İçin Giriş Yapmalısınız!", icon: "info", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
        }
    }
    useEffect(() => {
        handleDiscount();
        getIsLogin();
    }, [])


    return (
        <div className="card" style={{ maxWidth: "25rem" }}>
            <img src={product.image} alt="" className='card-img-top productImage ' />
            <MdDiscount className={product.price.discount > 0 ? `d-flex` : `d-none`} style={{ color: "green", position: "absolute", top: "10px", right: "10px", fontSize: "30px" }} />
            <FcLike style={{ color: "red", position: "absolute", top: "10px", left: "10px", fontSize: "30px", cursor: 'pointer' }} onClick={likedProduct} />
            <div className="card-body">
                <a href="" onClick={() => navigate(`/product-details/${product._id}`)} style={{ color: "black" }} >
                    <h5  >{product.name}  <CgArrowTopRight /> </h5>
                </a>
                <span className={`OldPrice ${product.price.discount > 0 ? `d-inline` : `d-none`}`} style={{ color: "red", textDecoration: "line-through", fontStyle: "italic" }}>${product.price.current}</span>
                <span className='lastPrice ms-3' style={{ color: "green", fontSize: "25px" }}>${lastPrice}</span>
            </div>

        </div>
    )
}

export default ProductsItem

