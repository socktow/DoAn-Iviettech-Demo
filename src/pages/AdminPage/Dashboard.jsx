import React, { useState, Suspense } from 'react';
import { Typography, Select, Row, Col, Spin } from 'antd';
import { useSelector } from 'react-redux';

const Orders = React.lazy(() => import('./Orders'));
const DashboardCard = React.lazy(() => import('../../chart/Card'));
const OrderPerMonth = React.lazy(() => import('../../chart/OrderPerMonth'));
const OrderInMonth = React.lazy(() => import('../../chart/OrderInMonth'));
const OrderRevernueInMonth = React.lazy(() => import('../../chart/OrderRevernueInMonth'));

const Dashboard = () => {
    const THEME = useSelector((state) => state.theme.theme);
    const isDark = Boolean(THEME === 'dark');
    const [month, setMonth] = useState(1);
    const handleChange = (value) => {
        setMonth(+value);
    };

    return (
        <div className="dashboard">
            <Suspense fallback={<Spin tip="Loading..."></Spin>}>
                <DashboardCard />
                <Row justify="start" gutter={[16, { xs: 8, sm: 8, md: 16 }]}>
                    <Col xl={14} lg={24} xs={24} sm={24} md={24}>
                        <div
                            style={{
                                borderRadius: 10,
                                boxShadow: '5px 5px 5px #999',
                                padding: '12px 20px',
                                background: isDark ? '#001529' : '#fff',
                                marginTop: 20,
                            }}
                        >
                            <OrderPerMonth />
                            <Typography.Title
                                level={4}
                                style={{
                                    textAlign: 'center',
                                    margin: 10,
                                    color: isDark ? '#fff' : '#001529',
                                }}
                            >
                                Volume of products sold per month
                            </Typography.Title>
                        </div>
                    </Col>
                    <Col xl={10} lg={24} xs={24} sm={24} md={24}>
                        <div
                            style={{
                                borderRadius: 10,
                                boxShadow: '5px 5px 5px #999',
                                padding: '20px 20px',
                                background: isDark ? '#001529' : '#fff',
                                marginTop: 20,
                            }}
                        >
                            <Select
                                defaultValue="1"
                                style={{
                                    width: '40%',
                                    marginLeft: 50,
                                }}
                                onChange={handleChange}
                            >
                                <Select.Option value="1">January</Select.Option>
                                <Select.Option value="2">February</Select.Option>
                                <Select.Option value="3">March</Select.Option>
                                <Select.Option value="4">April</Select.Option>
                                <Select.Option value="5">May</Select.Option>
                                <Select.Option value="6">June</Select.Option>
                                <Select.Option value="7">July</Select.Option>
                                <Select.Option value="8">August</Select.Option>
                                <Select.Option value="9">September</Select.Option>
                                <Select.Option value="10">October</Select.Option>
                                <Select.Option value="11">November</Select.Option>
                                <Select.Option value="12">December</Select.Option>
                            </Select>
                            <br />
                            <OrderInMonth month={month} />
                        </div>
                    </Col>
                </Row>
                <div
                    className="revenue-per-month"
                    style={{
                        background: isDark ? '#001529' : '#fff',
                        margin: '20px 0',
                        borderRadius: 10,
                        padding: 20,
                        boxShadow: '5px 5px 5px #999',
                    }}
                >
                    <OrderRevernueInMonth />
                    <Typography.Title
                        level={4}
                        style={{
                            textAlign: 'center',
                            margin: 10,
                            color: isDark ? '#fff' : '#001529',
                        }}
                    >
                        Number of order and revenue by month
                    </Typography.Title>
                </div>
                <Orders />
            </Suspense>
        </div>
    );
};

export default Dashboard;
