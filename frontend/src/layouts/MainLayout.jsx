import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Copyright from '../components/Copyright/Copyright'
import SearchModal from '../components/Modals/SearchModal'

function MainLayout({ children }) {

    return (
        <div className='main-layout' style={{ position: "relative" }}>
            <Header />
            <SearchModal />
            {
                children
            }

            <Footer />
            <Copyright />
        </div>
    )
}

export default MainLayout