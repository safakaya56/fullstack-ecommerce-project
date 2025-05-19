import {
    BarcodeOutlined,
    DashboardOutlined,
    LaptopOutlined,
    ProductOutlined,
    RollbackOutlined,
    ShoppingCartOutlined,
    UserAddOutlined,
} from '@ant-design/icons';

import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
    {
        key: '1',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },


    {
        key: '2',
        icon: <ProductOutlined />,
        label: 'Kategoriler',
        children: [
            { key: '3', label: 'Kategori Listesi' },
            { key: '4', label: 'Kategori Oluştur' },
        ]
    },


    {
        key: '5',
        label: 'Kuponlar',
        icon: <BarcodeOutlined />,
        children: [
            { key: '6', label: 'Kupon Listesi' },
            { key: '7', label: 'Kupon Oluştur' },
        ]
    },


    {
        key: '8',
        label: 'Kullanıcılar',
        icon: <UserAddOutlined />,
        children: [
            { key: '9', label: 'Kullanıcı Listesi' },
            { key: '10', label: 'Kullanıcı Oluştur' },
        ]
    },

    {
        key: '11',
        label: 'Ürünler',
        icon: <LaptopOutlined />,
        children: [
            { key: '12', label: 'Ürün Listesi' },
            { key: '13', label: 'Ürün Oluştur' },
        ]
    },

    {
        key: '14',
        icon: <ShoppingCartOutlined />,
        label: 'Siparişler',
    },
    {
        key: '15',
        label: 'Sliders',
        icon: <LaptopOutlined />,
        children: [
            { key: '16', label: 'Slider Listesi' },
            { key: '17', label: 'Slider Oluştur' },
        ]
    },

    {
        key: '18',
        icon: <RollbackOutlined />,
        label: 'Ana Sayfaya Git',
    },

];



function Sidebar() {

    const navigate = useNavigate();

    const handleNavigate = (e) => {

        if (e.key === '1') {
            navigate("/admin/dashboard");
        }

        if (e.key === '18') {
            navigate("/");
            window.location.reload();
        }

        if (e.key === '2' || e.key === '3') {
            navigate("/admin/categories");
        }

        if (e.key === '4') {
            navigate("/admin/categories/create");
        }

        if (e.key === '9') {
            navigate("/admin/users");
        }
        if (e.key === '10') {
            navigate("/admin/users/create");
        }
        if (e.key === '12') {
            navigate("/admin/product");
        }
        if (e.key === '13') {
            navigate("/admin/product/create");
        }
        if (e.key === '6') {
            navigate("/admin/coupons");
        }
        if (e.key === '7') {
            navigate("/admin/coupons/create");
        }
        if (e.key === '16') {
            navigate("/admin/slider");
        }
        if (e.key === '17') {
            navigate("/admin/slider/create");
        }
        if (e.key === '14') {
            navigate("/admin/orders");
        }
    }


    return (
        <>

            <Menu
                style={{ height: "100vh", borderRight: "1px solid black" }}
                defaultSelectedKeys={['1']}
                mode={'vertical'}
                theme={'light'}
                items={items}
                onClick={handleNavigate}
            />
        </>
    )
}

export default Sidebar

/** */