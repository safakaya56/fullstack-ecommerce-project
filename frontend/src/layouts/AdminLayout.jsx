import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

function AdminLayout({ children }) {

    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(null)
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/",)
            return;
        }

        try {
            const base64Url = token.split('.')[1];
            const decodedData = JSON.parse(atob(base64Url));

            if (decodedData.role === "admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
                navigate("/");
                window.location.reload();
            }

        } catch (error) {
            console.error(error)
        }
    }, [navigate]);



    if (isAdmin == true) {

        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    collapsible
                    collapsed={collapsed} 
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <Sidebar />
                </Sider>
                <Layout style={{ minHeight: "100vh" }}>
                    <Header>
                        <h1 style={{ color: "white", textAlign: "center", }} className="p-2">Admin Panel</h1>
                    </Header>
                    <Content>
                        <div>
                            {
                                children
                            }
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }

}

export default AdminLayout;
