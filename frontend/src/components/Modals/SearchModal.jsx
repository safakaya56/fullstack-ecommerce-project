import { Modal } from 'antd';
import "./searchModal.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/SearchModalSlice';
import { CLIENT_DOMAIN } from "../../config";

function SearchModal() {

    const [products, setProducts] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isModal } = useSelector((store) => store.searchModal);


    const handleCancel = () => {
        dispatch(closeModal())
        setProducts(null)
    };

    const handleGetSearchProduct = async (e) => {
        e.preventDefault();
        const name = e.target[0].value
        e.target[0].value = "";
        try {
            const res = await fetch(`${CLIENT_DOMAIN}/product/search/${name}`);
            if (res.ok) {
                const data = await res.json();
                setProducts(data);

                if (data.length == 0) {
                    Swal.fire({ text: "Aradığınız ürün bulunamadı!", icon: "info", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
                }
            }

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <Modal title="Search" open={isModal} onCancel={handleCancel} footer={null}>
                <div>
                    <div className='info text-center'>
                        <h5 className='text-center'>Search for products</h5>
                        <p>Start typing to see products you are looking for</p>
                    </div>

                    <form className='searchBar' onSubmit={handleGetSearchProduct}>
                        <input type="text" placeholder='Search a product' />
                        <button className='btn btn-dark' type='submit'>Search</button>
                    </form>

                    <div className="findProducts mt-4">

                        {
                            products &&
                            products.map((item) => (
                                <div className="findProduct shadow-lg">
                                    <img src={item.image} alt="" className='findProductImg' />
                                    <div>
                                        <h6 className="title"
                                            style={{ textDecoration: "underline", cursor: "pointer" }}
                                            onClick={() => { navigate(`/product-details/${item._id}`); dispatch(closeModal()); window.location.reload() }}
                                        >
                                            {item.name}</h6>
                                        <div className='price'>$ {item.price.current}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default SearchModal;