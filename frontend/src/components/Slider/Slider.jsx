import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { CLIENT_DOMAIN } from "../../config";

function Slider() {

    const [data, setData] = useState([]);

    const handleGetSlider = async () => {
        try {
            const res = await fetch(`${CLIENT_DOMAIN}/slider`);
            if (res.ok) {
                const data = await res.json();
                setData(data);
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleGetSlider();
    }, [])

    return (

        <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={2500}>
            {
                data && (
                    data.map((item) => (
                        <div>
                            <img src={item?.image}
                                alt="slider-image"
                                style={{ width: '100%', height: '600px', objectFit: 'cover' }}
                            />
                        </div>
                    ))
                )
            }
        </Carousel>


    )
}

export default Slider