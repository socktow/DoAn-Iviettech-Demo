import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DashboardTwoTone, ShopTwoTone, ShoppingTwoTone, ContactsTwoTone, SettingTwoTone } from '@ant-design/icons';
import { ROUTES } from '../constants/Router';
import '../sass/_admin.scss';
import MainContent from '../components/AdminPage/MainContent';
import Heading from './AdminPage/Header';
import { useSelector } from 'react-redux';

const AdminPage = () => {
    const THEME = useSelector((state) => state.theme.theme);
    const isDark = Boolean(THEME === 'dark');
    const { Header, Content, Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    function getItem(label, key, icon) {
        return {
            key,
            icon,
            label,
        };
    }
    const items = [
        getItem(<Link to={ROUTES.DASHBOARD.path}>Dashboard</Link>, '1', <DashboardTwoTone />),
        getItem(<Link to={ROUTES.PRODUCT.path}>Products</Link>, '2', <ShopTwoTone />),
        getItem(<Link to={ROUTES.ORDER.path}>Order Management</Link>, '3', <ShoppingTwoTone />),
        getItem(<Link to={ROUTES.USER.path}>User</Link>, '4', <ContactsTwoTone />),
        getItem(<Link to={ROUTES.SETTING.path}>Setting</Link>, '5', <SettingTwoTone />),
    ];
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className={`${isDark ? 'dark-style' : 'light-style'}`}>
                <Heading />
            </Header>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    className={`${isDark ? 'dark-style' : 'light-style'}`}
                >
                    <Menu theme={`${isDark ? 'dark' : 'light'}`} mode="inline" items={items} />
                </Sider>
                <Content className="site-main">
                    <MainContent />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
