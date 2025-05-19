import { useEffect, useState } from "react";
import Slider from "react-slick";
import "./products.css";
import ProductsItem from "./ProductsItem";
import { Container } from "@mui/material";
import Title from "../Title/Title";
import { CLIENT_DOMAIN } from "../../config";

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const handleGetProducts = async () => {
            try {
                const res = await fetch(`${CLIENT_DOMAIN}/product`);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }

            } catch (error) {
                console.error(error)
            }
        }

        handleGetProducts();
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,
        accessibility: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const titleH = "Featured Products";

    return (
        <Container maxWidth="xl" className="productsMainContainer">
            <div className="titleContainer">
                <Title h={titleH} />
            </div>
            <div className="productList">
                <Slider {...settings}>
                    {products.map((item, index) => (
                        <ProductsItem product={item} key={index} />
                    ))}
                </Slider>
            </div>
        </Container>
    );
}

export default Products;
