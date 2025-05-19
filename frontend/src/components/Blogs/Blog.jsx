import React from 'react'
import "./blog.css"
import { Container } from '@mui/material';
import Title from '../Title/Title';

function Blog() {

    const titleH = "From Our Blog";

    return (
        <Container maxWidth="xl" className='blogContainer'>

            <div className='titleContainer'>
                <Title h={titleH} />
            </div>
            <div className="blogCardsContainer">
                <div className="blogcard shadow-lg">
                    <img src="/img/blogs/blog1.jpg" alt="" className="card-img-top" />
                    <div className="card-body">
                        <span className='date'>25 Feb, 2025</span>
                        <h5 className='card-title'>Title</h5>
                        <p>Some quick example text</p>
                        <a href="#">Read More</a>
                    </div>
                </div>

                <div className="blogcard shadow-lg">
                    <img src="/img/blogs/blog2.jpg" alt="" className="card-img-top" />
                    <div className="card-body">
                        <span className='date'>25 Feb, 2025</span>
                        <h5 className='card-title'>Title</h5>
                        <p>Some quick example text</p>
                        <a href="#">Read More</a>
                    </div>
                </div>

                <div className="blogcard shadow-lg">
                    <img src="/img/blogs/blog3.jpg" alt="" className="card-img-top" />
                    <div className="card-body">
                        <span className='date'>25 Feb, 2025</span>
                        <h5 className='card-title'>Title</h5>
                        <p>Some quick example text</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default Blog