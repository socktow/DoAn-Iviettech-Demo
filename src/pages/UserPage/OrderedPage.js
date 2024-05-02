import { Button, Table, message } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { actGetOrderUser } from '../../redux/actions/orderAction';
import '../../sass/_ordered.scss';
import '../../sass/_button.scss';
import { deleteOrderById } from '../../apis/orderApi';

export default function OrderedPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.orderReducer);

    const handleClickToDetail = (id) => {
        history.push(`/products/${id}`);
    };

    React.useEffect(() => {
        dispatch(actGetOrderUser(profile.id));
        // eslint-disable-next-line
    }, []);

    const handleDeleteOrder = async (id) => {
        await deleteOrderById(id);
        dispatch(actGetOrderUser(profile.id));
        message.success('Đã hủy đơn hàng');
    };

    const columns = [
        {
            title: 'SẢN PHẨM',
            dataIndex: 'products',
            key: 'products',
            render: (_, item) => (
                <div
                    key={item?.id}
                    style={{ display: 'flex', alignItems: 'center' }}
                    onClick={() => handleClickToDetail(item?.id)}
                >
                    <img
                        src={item?.srcImage}
                        alt={item?.name}
                        width="60px"
                        height="60px"
                        style={{ margin: '0 10px' }}
                    />
                    <p>{item?.name}</p>
                </div>
            ),
        },
        {
            title: 'ĐƠN GIÁ',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (_, item) => (
                <div key={item?.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{item?.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                </div>
            ),
        },
        {
            title: 'SỐ LƯỢNG',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, item) => (
                <div key={item?.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{item?.quantity}</p>
                </div>
            ),
            responsive: ['md'],
        },
    ];

    return (
        <div className="ordered-page">
            {!!orders?.length ? (
                orders?.map((order) => (
                    <div key={order?.id} className="order">
                        <h3>Ngày mua: {order?.createAt}</h3>
                        <h3>
                            Tình trạng đơn hàng:{' '}
                            <strong>
                                {order?.deliveryStatus === 'delivered'
                                    ? 'Đã giao hàng'
                                    : order?.deliveryStatus === 'inTransit'
                                    ? 'Đang vận chuyển'
                                    : order?.deliveryStatus === 'shipped'
                                    ? 'Đang xử lý'
                                    : 'Đã hủy'}
                            </strong>
                        </h3>
                        <Table dataSource={order?.cart} columns={columns} pagination={false} />
                        <h3 style={{ paddingTop: '15px' }}>Phương thức thanh toán: {order?.paymentMethod}</h3>
                        <h3 style={{ paddingTop: '10px' }}>
                            Tổng tiền:{' '}
                            {order?.totalMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </h3>
                        {order?.deliveryStatus === 'shipped' && (
                            <Button className="btn-add-to-card" onClick={() => handleDeleteOrder(order?.id)}>
                                HỦY ĐƠN HÀNG
                            </Button>
                        )}
                    </div>
                ))
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <Link to="/products">
                        <Button className="btn-add-to-card ">TÌM CÁC SẢN PHẨM</Button>
                    </Link>
                    <h3>Bạn chưa có đơn hàng nào !</h3>
                </div>
            )}
        </div>
    );
}
