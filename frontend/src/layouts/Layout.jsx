import MainLayout from './MainLayout'
import AdminLayout from './AdminLayout'

const isAdmin = window.location.pathname.startsWith("/admin");

const Layout = isAdmin ? AdminLayout : MainLayout;

export default Layout