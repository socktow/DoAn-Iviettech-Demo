import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Space, Table, Button, Popconfirm, message, Input, Spin } from 'antd';
import { EditFilled, DeleteFilled, SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { OrderTypes } from '../../redux/constants';
import { deleteOrderById } from '../../apis/orderApi';

const OrderForm = React.lazy(() => import('../../Form/OrderForm'));

const Orders = () => {
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector((state) => state.orderReducer.orders);
    const THEME = useSelector((state) => state.theme.theme);
    const isDark = Boolean(THEME === 'dark');

    useEffect(() => {
        fetchOrders();
    }, []);
    const fetchOrders = () => {
        dispatch({ type: OrderTypes.GET_ORDERS_BY_USER });
    };
    const columns = [
        {
            title: 'Order Code',
            dataIndex: 'id',
            with: '10%',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Customer',
            dataIndex: 'username',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Search..."
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => confirm()}
                    ></Input>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => record.username.toLowerCase().startsWith(value.toLowerCase()),
        },
        {
            title: 'Order',
            dataIndex: 'cart',
            with: '15%',
            render: (cart) =>
                cart.map((product) => (
                    <p key={product.id}>
                        {product.name} - {product.quantity}
                    </p>
                )),
        },
        {
            title: 'Delivery Date',
            dataIndex: 'createAt',
            with: '15%',
        },
        {
            title: 'Delivery Pricing',
            dataIndex: 'totalMoney',
            with: '15%',
            sorter: (a, b) => a.totalMoney - b.totalMoney,
            render: (totalMoney) =>
                totalMoney.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                }),
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            with: '15%',
        },
        {
            title: 'Delivery Status',
            dataIndex: 'deliveryStatus',
            with: '10%',
            filters: [
                {
                    text: <span>Delivered</span>,
                    value: 'delivered',
                },
                {
                    text: <span>Shipped</span>,
                    value: 'shipped',
                },
                {
                    text: <span>In Transit </span>,
                    value: 'inTransit',
                },
                {
                    text: <span>Canceled</span>,
                    value: 'canceled',
                },
            ],
            onFilter: (value, record) => record.deliveryStatus.includes(value),
            render: (_, { deliveryStatus }) => (
                <span
                    style={{
                        color: `${
                            deliveryStatus === 'delivered'
                                ? 'green'
                                : deliveryStatus === 'shipped'
                                ? 'blue'
                                : deliveryStatus === 'inTransit'
                                ? 'orange'
                                : 'red'
                        }`,
                    }}
                >
                    {deliveryStatus.toUpperCase()}
                </span>
            ),
            align: 'center',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '12%',
        },
        {
            title: 'Action',
            width: '10%',
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Button size="small" onClick={(e) => onEdit(record, e)}>
                        <EditFilled />
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title="Are you sure to delete this product?"
                        onConfirm={(e) => onDelete(record.id, e)}
                    >
                        <Button size="small">
                            <DeleteFilled />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const NewOrders = orders.map((order) => {
        console.log(order.deliveryStatus);
        return {
            ...order,
            deliveryStatus: order.deliveryStatus === undefined ? 'shipped' : order.deliveryStatus,
        };
    });

    const onDelete = async (id, e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await deleteOrderById(id);
            message.success('Delete order success');
        } catch (error) {
            message.error('Delete order fail');
            console.error(error);
        }
        setIsLoading(false);
    };

    const onEdit = (order, e) => {
        e.preventDefault();
        modalRef.current?.handleOpenModal(order);
    };
    return (
        <>
            <Suspense fallback={<Spin tip="Loading..."></Spin>}>
                <Table
                    columns={columns}
                    dataSource={NewOrders}
                    bordered
                    loading={isLoading}
                    size="medium"
                    rowKey={(record) => record.id}
                    pagination={{
                        pageSize: 15,
                        style: {
                            padding: '0 20px',
                        },
                        position: ['bottomRight'],
                    }}
                    className={`${isDark ? 'dark-style' : 'light-style'}`}
                ></Table>
                <OrderForm ref={modalRef} reload={fetchOrders} />
            </Suspense>
        </>
    );
};

export default Orders;
