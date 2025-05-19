import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBasket, updateProductCount } from "../../redux/CartSlice";
import { resetTotals } from "../../redux/TotalSlice";
import  EmptyData  from "../Empty/EmptyData";

function CartProducts() {

    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.cart);
    const { subTotal } = useSelector((store) => store.totals);

    const handleCountUpdate = (newCount, id) => {
        if (newCount > 0) {
            dispatch(updateProductCount({ newCount, id }));
        }
    };

    const handleRemove = (id) => {
        dispatch(removeFromBasket(id));
        dispatch(resetTotals())
    };



    return (
        <div className='productList'>
            {products.length > 0 ? (
                <table className="productsTable" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Images</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div className="cartImgBox">
                                        <IoIosCloseCircleOutline
                                            className="removeIcon"
                                            onClick={() => handleRemove(product.id)}
                                        />
                                        <img src={product.image} alt="" style={{ width: "50px" }} />
                                    </div>
                                </td>
                                <td>{product.name}</td>
                                <td>${product.price - (product.discount > 0 ? product.price * product.discount / 100 : 0)}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={product.quantity}
                                        style={{ maxWidth: "50px" }}
                                        onChange={(e) => handleCountUpdate(Number(e.target.value), product.id)}
                                    />
                                </td>
                                <td>{product.selected_color}</td>
                                <td>{product.selected_size}</td>
                                <td>${subTotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>
                    <EmptyData />
                </div>
            )}
        </div>
    )
}

export default CartProducts