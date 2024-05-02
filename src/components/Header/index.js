/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../sass/_header.scss';
import RegisterForm from '../RegisterForm';
import SideDrawer from '../Drawer';

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
const { Search } = Input;

export default function Header() {
    const history = useHistory();
    const { profile, isLoggIn } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cartReducer);
    const { products } = useSelector((state) => state.productReducer);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [visibleSearchResult, setVisibleSearchResult] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [searchDebound, setSearchDebound] = React.useState('');
    const [searchResult, setSearchResult] = React.useState([]);
    const timingTimeoutRef = React.useRef(null);

    const uniqueIds = [];

    const unique = products.filter((element) => {
        const isDuplicate = uniqueIds.includes(element.category);

        if (!isDuplicate) {
            uniqueIds.push(element.category);
            return true;
        }

        return false;
    });

    const handleClick = (id) => {
        history.replace(`/products/${id}`);
        setVisibleSearchResult(false);
    };

    const handleLinkToAdmin = () => {
        history.push('/admin');
    };

    const handleClickCategory = () => {
        history.push('/products');
    };

    const handleSearchDebound = (e) => {
        const value = e.target.value;
        setSearchDebound(value);

        if (timingTimeoutRef.current) {
            clearTimeout(timingTimeoutRef.current);
        }

        timingTimeoutRef.current = setTimeout(() => {
            const filterResult = products?.filter((product) => {
                return product?.name?.toLowerCase()?.includes(value) || product?.brand?.toLowerCase()?.includes(value);
            });
            setSearchResult(filterResult);
        }, 500);
        setVisibleSearchResult(true);
    };

    return (
        <>
            <div className="header">
                <div className="header__text">
                    <h3>Miễn phí vận chuyển với các đơn hàng trên 300,000 VNĐ</h3>
                </div>
                <div className="header__contact">
                    <div className="header__contact--left">
                        <p>
                            LIÊN HỆ TƯ VẤN: <span>0123456789</span>
                        </p>
                        <p>
                            ĐỊA CHỈ: <span>84 QUANG TRUNG, HẢI CHÂU, ĐÀ NẴNG</span>
                        </p>
                    </div>
                    <div className="header__contact--right">
                        <ul>
                            <li>Về chúng tôi</li>
                            <li>Các câu hỏi - FAQ</li>
                            <li>Liên hệ</li>
                            <li className="socials__contact">
                                <a href="#">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faPhone} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="header__sticky">
                    <div className="masthead">
                        <div className="masthead__logo">
                            <Link to="/">
                                <img
                                    src="https://clmensstore.com/wp-content/uploads/2022/02/Orange-Black-Bats-Happy-Halloween-Instagram-Post-1080-x-500-px-220-x-102-px.png"
                                    alt="Logo"
                                />
                            </Link>
                        </div>
                        <div className="masthead__search">
                            <form>
                                <Search
                                    placeholder="Nhập vào đây để tìm kiếm sản phẩm..."
                                    style={{
                                        width: 550,
                                    }}
                                    value={searchDebound}
                                    onChange={handleSearchDebound}
                                />
                            </form>

                            {visibleSearchResult && (
                                <div className="search__result">
                                    <div className="search__result-show">
                                        {searchDebound !== '' && !!searchResult.length
                                            ? searchResult?.map((result) => (
                                                  <div className="search__result-item" key={result?.id}>
                                                      <img
                                                          src={result?.srcImage}
                                                          alt={result?.name}
                                                          width="50px"
                                                          height="50px"
                                                          onClick={() => handleClick(result?.id)}
                                                      />
                                                      <p>{result.name}</p>
                                                      <span className="price-search">
                                                          <strong>
                                                              {result?.price.toLocaleString('it-IT', {
                                                                  style: 'currency',
                                                                  currency: 'VND',
                                                              })}
                                                          </strong>
                                                      </span>
                                                  </div>
                                              ))
                                            : searchDebound === ''
                                            ? setVisibleSearchResult(false)
                                            : 'Opps ! Không có kết quả tìm kiếm...'}
                                    </div>
                                </div>
                            )}

                            <span className="masthead__advise"></span>
                            {profile?.isAdmin ? (
                                <h3 onClick={handleLinkToAdmin} style={{ cursor: 'pointer' }}>
                                    QUẢN LÝ ADMIN PAGE
                                </h3>
                            ) : (
                                <h3 style={{ cursor: 'pointer' }}>LIÊN HỆ TƯ VẤN</h3>
                            )}
                        </div>
                        <div className="masthead__login">
                            {!isLoggIn ? (
                                <Button
                                    type="primary"
                                    shape="round"
                                    style={{ background: '#000', border: '1px solid #000' }}
                                    onClick={() => setModalVisible(true)}
                                >
                                    ĐĂNG NHẬP
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    shape="round"
                                    style={{ background: '#000', border: '1px solid #000' }}
                                >
                                    <Link to="/profile">
                                        <span>{profile?.username}</span>
                                    </Link>
                                </Button>
                            )}

                            <span className="line"></span>
                            <div className="cart" style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon
                                    icon={faShoppingCart}
                                    style={{ fontSize: '20px' }}
                                    onClick={() => setVisible(true)}
                                />
                                <span className="cart-number">{cart.length}</span>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <div className="drop__item">
                            {unique?.map((produce) => (
                                <li className="list-category" onClick={handleClickCategory}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>{(produce?.category).toUpperCase()}</Space>
                                    </a>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <RegisterForm isVisible={modalVisible} setModal={setModalVisible} />
            <SideDrawer drawerVisible={visible} setDrawerVisible={setVisible} />
        </>
    );
}
