import { useEffect, useState } from "react";
import FavouriteItem from "./FavouriteItem";
import EmptyData from "../Empty/EmptyData";
import { CLIENT_DOMAIN } from "../../config";


function Favourite() {


    const [email, setEmail] = useState();
    const [likedProduct, setLikedProduct] = useState([]);

    const getLikedProduct = async () => {
        let user;
        const token = localStorage.getItem("token");
        if (token) {
            user = JSON.parse(atob(token.split('.')[1]));
            setEmail(user?.email)
        }
        else {
            return alert("no token")
        }
        try {
            const res = await fetch(`${CLIENT_DOMAIN}/favourite/${user?.email}`);
            if (res.ok) {
                const data = await res.json();
                setLikedProduct(data.likedProducts)
            }
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        getLikedProduct();
    }, [])


    return (

        <div className="container p-5" style={{ margin: "150px auto" }}>
            {
                likedProduct.length > 0 ? (

                    <div className="row row-cols-2 row-cols-md-3 row-cols-xl-5 gap-4" style={{ display: "flex", justifyContent: "center" }}>
                        {
                            likedProduct.map((item) => (
                                <FavouriteItem item={item} email={email} />
                            ))
                        }
                    </div>
                ) : (
                    <div>
                        <EmptyData />
                    </div>
                )
            }
        </div>
    )
}

export default Favourite