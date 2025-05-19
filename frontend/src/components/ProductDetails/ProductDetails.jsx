import './productDetails.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/CartSlice.jsx';
import Swal from 'sweetalert2';
import { CLIENT_DOMAIN } from "../../config";

export default function ProductDetails() {

    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState();
    const [selectedColor, setSelectedColor] = useState();
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [lastPrice, setLastPrice] = useState();
    const [selectedProduct, setselectedProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { _id } = useParams();
    const dispatch = useDispatch();

    const handleCart = async () => {

        if (selectedColor && selectedSize) {
            const payload = {
                id: selectedProduct._id,
                name: selectedProduct.name,
                image: selectedProduct.image,
                price: selectedProduct.price.current,
                discount: selectedProduct.price.discount,
                quantity: Number(quantity),
                selected_color: selectedColor,
                selected_size: selectedSize

            }
            dispatch(addToCart(payload))
            await Swal.fire({ text: "Başarıyla eklendi", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            navigate("/cart")

        }
        else {
            Swal.fire({ text: "Renk ve Beden Seçiniz", icon: "info", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
        }

    }

    const handleGetSelectedProduct = async () => {
        try {
            const res = await fetch(`${CLIENT_DOMAIN}/product/${_id}`);
            if (res.ok) {
                const data = await res.json();
                setselectedProduct(data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleDiscount = () => {
        if (selectedProduct?.price?.current && selectedProduct?.price?.discount) {
            const current = Number(selectedProduct.price.current);
            const discount = Number(selectedProduct.price.discount);
            const result = current - ((current * discount) / 100);
            setLastPrice(result);
        }
    }

    const handleGetSizesAndColors = () => {
        const splittedColor = selectedProduct.colors.split(',');
        const splittedSizes = selectedProduct.sizes.split(',')
        setColors(splittedColor);
        setSizes(splittedSizes);
    }


    useEffect(() => {
        handleGetSelectedProduct();

    }, []);

    useEffect(() => {
        if (selectedProduct?.price) {
            handleDiscount();
        }

        if (selectedProduct?.colors && selectedProduct?.sizes) {
            handleGetSizesAndColors();

        }
    }, [selectedProduct])


    return (
        <div className="productContainer row g-5">

            <div className="col-lg-6 col-12 productImagesContainer">
                {selectedProduct.image &&
                    <img
                        src={selectedProduct.image}
                        alt="Product"
                        className="product-image"
                    />
                }
            </div>


            <div className="col-lg-6 col-12 productDetailsContainer">
                <h2 className="product-title">{selectedProduct.name}</h2>
                <div className="d-flex align-items-center mb-2">
                    <span className="text-warning me-2">★★★★★</span>
                    <span className="text-muted">(2 reviews)</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                    <span className="product-old-price me-2" style={{ color: "red" }}>${selectedProduct.price?.current}</span>
                    <span className="product-price">${lastPrice}</span>
                </div>
                <p className="text-muted">
                    {selectedProduct?.description}
                </p>


                <div>
                    <strong>Color:</strong>
                    <div className="color-options">
                        {colors.map(color => (
                            <div
                                key={color}
                                className={`color-option ${selectedColor == color ? `opacity-50` : ``}`}
                                style={{ backgroundColor: color }}
                                onClick={() => { setSelectedColor(color) }}
                            />
                        ))}
                    </div>
                </div>


                <div className="mt-3">
                    <strong>Size:</strong>
                    <div className="size-options">
                        {sizes.map(size => (
                            <button
                                className={`size-button ${selectedSize == size ? `opacity-50` : ``}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}</button>
                        ))}
                    </div>
                </div>



                <div className="d-flex align-items-center mt-3">
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="quantity-input me-2"
                        min="1"
                    />
                    <button className="add-to-cart" onClick={handleCart}>Add to Cart</button>
                </div>



                <div className="mt-3 extra-info">
                    <p>
                        <span className="me-3">SKU: BE45VGRT</span>
                        Categories: Fashion
                    </p>
                    <p>Tags: black, white</p>
                </div>
            </div>
        </div>

    );
}