import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx"
import CartPage from "../pages/CartPage.jsx"
import ContactPage from "../pages/ContactPage.jsx"
import AuthPage from "../pages/AuthPage.jsx"
import ProductDetails from "../pages/ProductDetailsPage.jsx"
import AdminUserListPage from "../pages/admin/user/AdminUserListPage.jsx";
import AdminCategoryListPage from "../pages/admin/category/AdminCategoryListPage.jsx";
import AdminCategoryUpdate from "../pages/admin/category/AdminCategoryUpdate.jsx";
import AdminCreCategory from "../pages/admin/category/AdminCreCategory.jsx";
import AdminProductList from "../pages/admin/product/AdminProductList.jsx";
import AdminProductUpdate from "../pages/admin/product/AdminProductUpdate.jsx";
import AdminCreProduct from "../pages/admin/product/AdminCreProduct.jsx";
import AdminCouponList from "../pages/admin/coupon/AdminCouponList.jsx";
import AdminCreCupons from "../pages/admin/coupon/AdminCreCupons.jsx";
import AdminCreUser from "../pages/admin/user/AdminCreUser.jsx";
import AdminSliderList from "../pages/admin/slider/AdminSliderList.jsx";
import AdminCreSlider from "../pages/admin/slider/AdminCreSlider.jsx";
import SuccesPage from "../pages/SuccesPage.jsx";
import Order from "../components/Order/Order.jsx";
import Favourite from "../components/Favourite/Favourite.jsx";
import AdminOrderList from "../pages/admin/order/AdminOrderList.jsx";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard.jsx";




function Routing() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/product-details/:_id' element={<ProductDetails />} />
            <Route path='/success' element={<SuccesPage />} />
            <Route path='/order' element={<Order />} />
            <Route path='/favourite' element={<Favourite />} />
            <Route path="/admin/*">
                <Route path="users" element={<AdminUserListPage />} />
                <Route path="users/create" element={<AdminCreUser />} />
                <Route path="categories" element={<AdminCategoryListPage />} />
                <Route path="categories/update/:id" element={<AdminCategoryUpdate />} />
                <Route path="categories/create" element={<AdminCreCategory />} />
                <Route path="product" element={<AdminProductList />} />
                <Route path="product/update/:id" element={<AdminProductUpdate />} />
                <Route path="product/create" element={<AdminCreProduct />} />
                <Route path="coupons" element={<AdminCouponList />} />
                <Route path="coupons/create" element={<AdminCreCupons />} />
                <Route path="slider" element={<AdminSliderList />} />
                <Route path="slider/create" element={<AdminCreSlider />} />
                <Route path="orders" element={<AdminOrderList />} />
                <Route path="dashboard" element={<AdminDashboard />} />
            </Route>


        </Routes>
    )
}

export default Routing