import React from 'react';
import { Button, Card, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { actLogout } from '../../redux/actions/authAction';
import '../../sass/_profile.scss';
import {
    CreditCardOutlined,
    HeartOutlined,
    IdcardOutlined,
    ShoppingCartOutlined,
    TrophyOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { actGetOrderUser } from '../../redux/actions/orderAction';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.orderReducer);

    const history = useHistory();

    const handleChangeProfilePage = (path) => {
        history.push(`/profile/${path}`);
    };

    React.useEffect(() => {
        dispatch(actGetOrderUser(profile.id));
        // eslint-disable-next-line
    }, []);

    const handleLogOut = () => {
        dispatch(actLogout());
        history.push('/');
    };

    return (
        <div className="profile">
            <div className="profile-container">
                <div className="profile__info">
                    <div className="profile__info-avatar">
                        <div style={{ maxHeight: '220px' }}>
                            <Image src={profile?.avatar} />
                        </div>
                        <div className="profile__utilities">
                            <p>{profile?.username}</p>
                            <p>{profile?.email}</p>
                            <Button
                                type="primary"
                                style={{ background: '#000', border: '1px solid #000' }}
                                onClick={handleLogOut}
                            >
                                ĐĂNG XUẤT
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="profile__content">
                    <div className="profile__grid">
                        <Card onClick={() => handleChangeProfilePage('ordered')}>
                            <span className="icon">
                                <ShoppingCartOutlined />
                                <span className="order-number">{orders.length}</span>
                            </span>
                            <p className="profile__text">Đơn hàng của bạn</p>

                            <p>Kiểm tra các đơn hàng mà bạn đã từng đặt tại Website CL Men's Store</p>
                        </Card>
                        <Card onClick={() => handleChangeProfilePage('change-profile')}>
                            <span className="icon">
                                <UserOutlined />
                            </span>
                            <p className="profile__text">Thay đổi thông tin</p>
                            <p>Chỉnh sửa lại thông tin, mật khẩu của bạn</p>
                        </Card>
                        <Card>
                            <span className="icon">
                                <IdcardOutlined />
                            </span>
                            <p className="profile__text">Cập nhật địa chỉ nhận hàng</p>
                            <p>Thay đổi và cập nhật lại địa chỉ nhận hàng của bạn</p>
                        </Card>
                        <Card>
                            <span className="icon">
                                <CreditCardOutlined />
                            </span>
                            <p className="profile__text">Thẻ thành viên</p>
                            <p>Kiểm tra các đơn hàng mà bạn đã từng đặt tại Website CL Men's Store</p>
                        </Card>
                        <Card>
                            <span className="icon">
                                <TrophyOutlined />
                            </span>
                            <p className="profile__text">Điểm tích lũy</p>
                            <p>Chức năng chưa ra mắt, vui lòng đợi thêm</p>
                        </Card>
                        <Card>
                            <span className="icon">
                                <HeartOutlined />
                            </span>
                            <p className="profile__text">Danh sách yêu thích</p>
                            <p>Chức năng tạm thời chưa ra mắt, xin vui lòng đợi thêm...</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
