import Categories from '../components/Categories/Categories'
import Products from '../components/Products/Products'
import Blog from '../components/Blogs/Blog'
import Brands from '../components/Brands/Brands'
import CampaignSingle from '../components/CampaignSingle/CampaignSingle'
import Slider from '../components/Slider/Slider'


function Home() {
    return (
        <div>
            <Slider />
            <Categories />
            <Products />
            <Blog />
            <CampaignSingle />
            <Brands />
        </div>
    )
}

export default Home