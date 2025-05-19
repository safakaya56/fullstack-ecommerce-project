import { Progress } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CartProgress() {

    const { total } = useSelector((store) => store.totals);
    const [level, setLevel] = useState();
    const progressBarLevel = () => {
        if (total >= 300) {
            setLevel(100);
        }
        else if (total > 0) {
            let temp = total * 100 / 300;
            setLevel(temp.toFixed(2));
        }
        else {
            setLevel(0);
        }
    }


    useEffect(() => {
        progressBarLevel();
    }, [total])


    return (
        <div className='mb-5'>
            <p>Add <strong>$300.00</strong> to cart and get free shipping!</p>
            <Progress
                percent={level}
                status="active"
                size={[, 25]}
                percentPosition={{ align: 'center', type: 'inner' }}
                strokeColor="green"
                style={{ fontWeight: "bold", fontSize: "15px" }}
            />
        </div>
    )
}

export default CartProgress