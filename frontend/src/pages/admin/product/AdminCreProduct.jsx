import { Container } from "@mui/material"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import {CLIENT_DOMAIN} from '../../../config';



function AdminCreProduct() {

    const [product, setProduct] = useState({
        name: "", image: "", description: "", colors: [], sizes: [], price: { current: "", discount: "" }, category: ""
    });

    const [categories, setCategories] = useState([]);


    const handleGetCategoriesNames = async () => {
        try {

            const response = await fetch(`${CLIENT_DOMAIN}/categories`);
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }

        } catch (error) {
            console.error(error)
        }

    }

    const handleGetInput = (e) => {
        const { name, value } = e.target;

        if (name == "current" || name == "discount") {
            setProduct({ ...product, price: { ...product.price, [name]: value } })
        }
        else if (name == "colors") {
            setProduct({ ...product, colors: value.split(',') });
        }
        else if (name == "sizes") {
            setProduct({ ...product, sizes: value.split(',') });
        }
        else if (name == "category") {
            setProduct({ ...product, category: value });
        }
        else {
            setProduct({ ...product, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${CLIENT_DOMAIN}/product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });

            const data = await response.json();


            if (response.ok) {
                await Swal.fire({ text: "Kayıt Başarılı", icon: "success", showConfirmButton: false, timer: 1500, scrollbarPadding: false });
            }

        } catch (error) {
            console.error(error);
        }


    }


    useEffect(() => {
        handleGetCategoriesNames();
    }, [])


    return (
        <Container maxWidth="sm">
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleGetInput} />
                </div>
                <div className="form-group mt-3">
                    <label>İmage (URL)</label>
                    <input type="text" className="form-control" name="image" onChange={handleGetInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">Category</label>
                    {
                        categories &&
                        <select
                            className="form-control"
                            name="category"
                            onChange={handleGetInput}
                        >
                            <option value="" disabled selected>Seçiniz</option>
                            {categories.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.title}
                                </option>
                            ))}
                        </select>
                    }
                </div>

                <div className="form-group mt-3">
                    <label>Description</label>
                    <input type="text" className="form-control" name="description" onChange={handleGetInput} />
                </div>
                <div className="form-group mt-3">
                    <label>Price</label>
                    <input type="number" className="form-control" name="current" onChange={handleGetInput} />
                </div>
                <div className="form-group mt-3">
                    <label>Discount(%)</label>
                    <input type="number" className="form-control" name="discount" onChange={handleGetInput} />
                </div>
                <div className="form-group mt-3">
                    <label>Colors</label>
                    <input type="text" className="form-control" name="colors" onChange={handleGetInput} />
                </div>
                <div className="form-group mt-3">
                    <label>Sizes</label>
                    <input type="text" className="form-control" name="sizes" onChange={handleGetInput} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Create</button>
            </form>
        </Container>
    )
}

export default AdminCreProduct