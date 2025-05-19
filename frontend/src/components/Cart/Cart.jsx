import "./cart.css"
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateTotals } from '../../redux/TotalSlice';
import CartProducts from './CartProducts';
import CartCoupon from './CartCoupon';
import CartTotals from "./CartTotals";
import CartProgress from "./CartProgress";



function Cart() {

    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.cart);
    const { couponAdd } = useSelector((store) => store.coupon);

    const subTotal = useMemo(() => {
        let tempSubTotal = products.reduce((total, product) =>
            total + ((product.price - (product.discount > 0 ? product.price * product.discount / 100 : 0)) * product.quantity),
            0);
        return Number(tempSubTotal.toFixed(2));

    }, [products]);

    const total = useMemo(() => {
        let tempTotal = subTotal + (subTotal >= 300 || subTotal == 0 ? 0 : 25);
        if (couponAdd.isCoupon && subTotal > 0) {
            tempTotal -= tempTotal * (couponAdd.discount / 100);
        }
        return Number(tempTotal.toFixed(2));

    }, [subTotal, couponAdd]);


    useEffect(() => {
        if (subTotal && total) {
            dispatch(updateTotals({ total, subTotal }))
        }
    }, [subTotal, total])


    return (
        <div className='cartContainer'>

            <div className='productsAndShipping'>
                <CartProgress />
                <CartProducts />
                <CartCoupon />
            </div>
            <div className='cartTotals'>
                <CartTotals />
            </div>
        </div >
    );
}

export default Cart;
