import React from 'react';
import { Button, Card, Image, message } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import '../../sass/_button.scss';
import { actAddToCartSuccess } from '../../redux/actions/cartAction';
const { Meta } = Card;

export const showRating = (rating) => {
    const template = [];
    let i = 1;
    while (i <= 5) {
        if (i <= rating) {
            template.push(<StarFilled className="is-rating" key={i} />);
        } else template.push(<StarOutlined className="is-rating" key={i} />);
        i++;
    }
    return template;
};

export const discountPrice = (product) => {
    const discount = product?.discount ? product.discount : 0;
    const newPrice = product?.price * (1 - discount / 100);
    return newPrice;
};

export default function ItemContent({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(actAddToCartSuccess(product));
        message.success('Đã thêm vào giỏ hàng !');
    };

    const discount = product?.discount ? product.discount : 0;

    const history = useHistory();

    const handleClick = (id) => {
        history.push(`/products/${id}`);
    };

    return (
        <div className="card-content card-tabs" style={{ position: 'relative' }}>
            {discount !== 0 ? <p className="sale-icon">{`-${product.discount}%`}</p> : null}
            <Card
                hoverable
                style={{
                    width: 220,
                }}
                cover={
                    <Image
                        src={product?.srcImage}
                        style={{ maxHeight: '220px', minHeight: '220px' }}
                        alt={product?.name}
                    />
                }
            >
                <Meta
                    title={product?.name}
                    description={
                        <>
                            {discount !== 0 && (
                                <span style={{ textDecoration: 'line-through', color: '#334862', fontSize: '10px' }}>
                                    {product?.price.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </span>
                            )}
                            <span>
                                {discountPrice(product)?.toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </>
                    }
                    onClick={() => handleClick(product?.id)}
                />

                <Button className="btn-add-to-card" onClick={() => handleAddToCart(product)}>
                    THÊM VÀO GIỎ HÀNG
                </Button>
            </Card>
        </div>
    );
}
