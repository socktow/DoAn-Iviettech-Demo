import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { ShoppingCartOutlined, InboxOutlined, UserOutlined, DollarOutlined } from '@ant-design/icons';
import { getAllUser } from '../apis/usersApi';
import { getProducts } from '../apis/productsApi';
import { getOrderByUser } from '../apis/orderApi';

const DashboardCard = () => {
    const [state, setSate] = useState({});
    const getData = async () => {
        try {
            const users = await getAllUser();
            const products = await getProducts();
            const orders = await getOrderByUser();
            const revenue = orders.reduce((total, order) => (total += order.totalMoney), 0);
            const revenueChange = revenue.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
            });
            setSate({
                orders: orders.length,
                products: products.data.length,
                users: users.length,
                revenue: revenueChange,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    const style = {
        padding: '8px 15px',
        borderRadius: '7px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        boxShadow: '5px 5px 5px #999',
        height: '100px',
    };
    return (
        <Row gutter={[16, { xs: 8, sm: 8, md: 16 }]}>
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={6}>
                <div style={style} className="blue-card">
                    <div>
                        <p style={{ margin: 0, color: 'white' }}>Total Orders</p>
                        <strong style={{ color: 'white', fontSize: 30 }}>{state.orders}</strong>
                    </div>
                    <div>
                        <ShoppingCartOutlined style={{ color: 'white', fontSize: 40, fontWeight: 900 }} />
                    </div>
                </div>
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={6}>
                <div style={style} className="green-card">
                    <div>
                        <p style={{ margin: 0, color: 'white' }}>Total Products</p>
                        <strong style={{ color: 'white', fontSize: 30 }}>{state.products}</strong>
                    </div>
                    <div>
                        <InboxOutlined style={{ color: 'white', fontSize: 40, fontWeight: 900 }} />
                    </div>
                </div>
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={6}>
                <div style={style} className="yellow-card">
                    <div>
                        <p style={{ margin: 0, color: 'black' }}>Total Users</p>
                        <strong style={{ color: 'black', fontSize: 30 }}>{state.users}</strong>
                    </div>
                    <div>
                        <UserOutlined style={{ color: 'black', fontSize: 40, fontWeight: 900 }} />
                    </div>
                </div>
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={6}>
                <div style={style} className="red-card">
                    <div>
                        <p style={{ margin: 0, color: 'white' }}>Revenue</p>
                        <strong style={{ color: 'white', fontSize: 30 }}>{state.revenue}</strong>
                    </div>
                    <div>
                        <DollarOutlined style={{ color: 'white', fontSize: 40, fontWeight: 900 }} />
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default DashboardCard;
