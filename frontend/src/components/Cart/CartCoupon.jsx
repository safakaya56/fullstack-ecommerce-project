import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { updateCoupon, updateCouponAdd } from '../../redux/CouponSlice';
import { CLIENT_DOMAIN } from "../../config";

function CartCoupon() {

    const dispatch = useDispatch();
    const { coupon } = useSelector((store) => store.coupon);

    const handleGetCoupon = async (e) => {
        e.preventDefault();
        if (coupon.code == "") {
            return Swal.fire({ text: "Kupon kodu giriniz!", icon: "info", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
        }
        try {
            const res = await fetch(`${CLIENT_DOMAIN}/coupons/${coupon.code}`);
            if (res.ok) {
                const data = await res.json();
                dispatch(updateCouponAdd({ isCoupon: true, discount: data.discountPercentage }))
                Swal.fire({ text: "Kupon başarıyla uygulandı", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveCoupon = () => {
        if (coupon.code == "") {
            return Swal.fire({ text: "Kupon kodu yok!", icon: "info", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
        }
        dispatch(updateCouponAdd({ isCoupon: false, discount: 0 }))
        dispatch(updateCoupon({ code: "" }))
        Swal.fire({ text: "Kupon başarıyla silindi", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
    }

    const handleInput = (e) => {
        dispatch(updateCoupon({ code: e.target.value }))
    };

    return (
        <div className="couponSection">
            <input type="text" placeholder="Coupon code" name="code" onChange={handleInput} />
            <button onClick={handleGetCoupon}>Apply Coupon</button>
            <button className="bg-danger" onClick={handleRemoveCoupon}>Remove Coupon</button>
        </div>
    )
}

export default CartCoupon