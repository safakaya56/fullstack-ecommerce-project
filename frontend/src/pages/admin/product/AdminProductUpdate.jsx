import { useParams } from "react-router-dom"
import { Container } from "@mui/material"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import {CLIENT_DOMAIN} from '../../../config';

function AdminCategoryUpdate() {


    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});


    const handleGetProduct = async (id) => {
        const response = await fetch(`${CLIENT_DOMAIN}/product/${id}`);

        if (response.ok) {
            const data = await response.json();
            setProduct(data);
        }
    }

    const handleGetCategoriesNames = async () => {

        const response = await fetch(`${CLIENT_DOMAIN}/categories`);

        if (response.ok) {
            const data = await response.json();
            setCategories(data);
        }

    }

    const handleGetInput = (e) => {
        const { name, value } = e.target;
        if (name == "current") {
            setProduct(prev => ({ ...prev, price: { ...prev.price, current: Number(value) } }));
        }
        else if (name == "discount") {
            setProduct(prev => ({ ...prev, price: { ...prev.price, discount: Number(value) } }));
        }
        else {
            setProduct(prev => ({ ...prev, [name]: value }));
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/product/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            })

            if (response.ok) {
                await Swal.fire({ text: "Update is successful", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }
            else {
                await Swal.fire({ text: "Opps! Problem", icon: "error", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }

        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        handleGetProduct(id);
        handleGetCategoriesNames();
    }, [id])



    return (
        <Container maxWidth="sm">
            {
                product &&

                <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={product.name} name="name" onChange={handleGetInput} />
                    </div>
                    <div className="form-group mt-3">
                        <label>İmage (URL)</label>
                        <input type="text" className="form-control" value={product.image} name="image" onChange={handleGetInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">Category</label>
                        <select
                            className="form-control"
                            name="category"
                            value={product.category?._id || ""}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                const selectedCategory = categories.find(cat => cat._id === selectedId);
                                setProduct(prev => ({ ...prev, category: selectedCategory }));
                            }}
                        >
                            <option value="" disabled>Seçiniz</option>
                            {categories.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mt-3">
                        <label>Description</label>
                        <input type="text" className="form-control" value={product.description} name="description" onChange={handleGetInput} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Price</label>
                        <input type="number" className="form-control" value={Number(product.price?.current)} name="current" onChange={handleGetInput} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Discount(%)</label>
                        <input type="number" className="form-control" value={Number(product.price?.discount)} name="discount" onChange={handleGetInput} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Colors</label>
                        <input type="text" className="form-control" value={product.colors} name="colors" onChange={handleGetInput} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Sizes</label>
                        <input type="text" className="form-control" value={product.sizes} name="sizes" onChange={handleGetInput} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Update</button>
                </form>
            }
        </Container>
    )
}

export default AdminCategoryUpdate