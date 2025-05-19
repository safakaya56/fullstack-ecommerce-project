import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { CLIENT_DOMAIN } from "../../config";



function CartTotals() {

    const { products } = useSelector((store) => store.cart)
    const { total, subTotal } = useSelector((store) => store.totals)
    const { coupon, couponAdd } = useSelector((store) => store.coupon);
    const stripePK = import.meta.env.VITE_API_STRIPE_KEY;

    const handleCheckout = async () => {

        const token = localStorage.getItem("token");
        let decodedData;
        if (token) {
            const Base64Url = token.split('.')[1];
            decodedData = JSON.parse(atob(Base64Url));
        }
        else {
            return Swal.fire({ text: "Ödeme yapmak için giriş yapınız!", icon: "info", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
        }

        const body = {
            customer_email: decodedData?.email,
            products: products,
            couponCode: coupon.code,
            cargoFee: subTotal < 300 ? 25 : 0

        };

        try {
            const stripe = await loadStripe(stripePK);

            const res = await fetch(`${CLIENT_DOMAIN}/payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            const session = await res.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
            if (result.error) {
                throw new Error(result.error);

            }



        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h3>Cart totals</h3>
            <ul>
                <li><strong>Subtotal:</strong> ${subTotal.toFixed(2)}</li>
                <li><strong>Shipping: </strong>${subTotal >= 300 || subTotal == 0 ? "0.00" : "25.00"}</li>
                <li><strong>Coupon Discount: </strong>{couponAdd.isCoupon && subTotal > 0 ? `%${couponAdd.discount}` : "None"}</li>
                <li className="total"><strong>Total:</strong> ${total.toFixed(2)}</li>
            </ul>
            <button className='checkoutBtn' onClick={handleCheckout}>Proceed to checkout</button>
        </>
    )
}

export default CartTotals