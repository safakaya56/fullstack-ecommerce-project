import React, { useEffect, useState } from 'react'
import "./categories.css"
import CategoryItem from './CategoryItem';
import { Container } from '@mui/material';
import Title from '../Title/Title';
import { CLIENT_DOMAIN } from "../../config";


function Categories() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const handleGetCategories = async () => {
            try {
                const res = await fetch(`${CLIENT_DOMAIN}/categories`);
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }

            } catch (error) {
                console.error(error)
            }
        }

        handleGetCategories();

    }, [])

    const titleH = "All Categories";


    return (
        <Container maxWidth="xl" className='categoriesMainContainer'>
            <div className='titleContainer'>
                <Title h={titleH} />
            </div>
            {
                categories &&
                <div className="cardContainer">
                    {
                        categories.map((category, index) => (
                            <CategoryItem category={category} key={index} />
                        ))
                    }
                </div>

            }
        </Container>
    )
}

export default Categories 
