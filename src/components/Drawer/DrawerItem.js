import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actRemoveToCartSuccess } from '../../redux/actions/cartAction';
import { Link, useHistory } from 'react-router-dom';

import { discountPrice } from '../../components/Sale/ItemContent';
import '../../sass/_drawer.scss';
import '../../sass/_button.scss';
import { Button } from 'antd';

export default function DrawerItem() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cart } = useSelector((state) => state.cartReducer);

    const handleClick = (id) => {
        history.push(`/products/${id}`);
    };

    const handleDeleteCart = (item) => {
        dispatch(actRemoveToCartSuccess({ id: item }));
    };

    const totalMoney = cart.reduce((total, product) => {
        total += product?.quantity * discountPrice(product);
        return total;
    }, 0);

    return (
        <>
            {!!cart.length
                ? cart?.map((item) => (
                      <div className="drawer-item" key={item?.id}>
                          <img src={item?.srcImage} alt={item?.name} onClick={() => handleClick(item?.id)} />
                          <div className="drawer-mid">
                              <span style={{ color: '#334862', textOverflow: 'ellipsis', lineHeight: 1.3 }}>
                                  {item?.name}
                              </span>
                              <div className="drawer-money">
                                  <span>{item?.quantity}</span>
                                  <span>X</span>
                                  <span style={{ fontWeight: 'bold' }}>
                                      {discountPrice(item)?.toLocaleString('it-IT', {
                                          style: 'currency',
                                          currency: 'VND',
                                      })}
                                  </span>
                              </div>
                          </div>
                          <span onClick={() => handleDeleteCart(item?.id)}>
                              <CloseOutlined />
                          </span>
                      </div>
                  ))
                : null}
            <p className="drawer-total">
                {!!cart.length ? (
                    <p>Total: {totalMoney?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                ) : (
                    'Giỏ hàng trống !'
                )}
            </p>
            <div className="button-drawer">
                {!!cart.length ? (
                    <>
                        <Link to="/cart-detail">
                            <Button className="btn-add-to-card">XEM GIỎ HÀNG</Button>
                        </Link>
                        <Link to="/checkout">
                            <Button className="btn-add-to-card">THANH TOÁN</Button>
                        </Link>
                    </>
                ) : null}
            </div>
        </>
    );
}
