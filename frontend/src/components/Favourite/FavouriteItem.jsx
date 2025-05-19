import { CgArrowTopRight } from "react-icons/cg";
import { FcDislike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { MdDiscount } from "react-icons/md";
import { CLIENT_DOMAIN } from "../../config";


function FavouriteItem({ item, email }) {

    const navigate = useNavigate();

    const unlikedProduct = async () => {
        if (email) {
            try {
                const res = await fetch(`${CLIENT_DOMAIN}/favourite/${email}/${item.id}`, {
                    method: "DELETE"
                })
                if (res.ok) {
                    Swal.fire({ text: "Ürün favorilerden kaldırıldı", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
                }
                else {
                    Swal.fire({ text: "Hata Oluştu!", icon: "error", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
                }

                window.location.reload();

            } catch (error) {

            }
        }
    }

    return (
        <div className="card col" style={{ maxWidth: "25rem" }}>
            <img src={item.image} alt="" className='card-img-top productImage ' />
            <MdDiscount className={item.price.discount > 0 ? `d-flex` : `d-none`} style={{ color: "green", position: "absolute", top: "10px", right: "10px", fontSize: "30px" }} />
            <FcDislike style={{ color: "red", position: "absolute", top: "10px", left: "17px", fontSize: "30px", cursor: 'pointer' }} onClick={unlikedProduct} />
            <div className="card-body">
                <a href="" onClick={() => navigate(`/product-details/${item._id}`)} style={{ color: "black" }} >
                    <h5  >{item.name}  <CgArrowTopRight /> </h5>
                </a>
                <span className={`OldPrice ${item.price.discount > 0 ? `d-inline` : `d-none`}`} style={{ color: "red", textDecoration: "line-through", fontStyle: "italic" }}>${item.price.current}</span>
                <span className='lastPrice ms-3' style={{ color: "green", fontSize: "25px" }}>${Number(item.price.current - (item.price.current * item.price.discount / 100))}</span>
            </div>

        </div>
    )
}

export default FavouriteItem