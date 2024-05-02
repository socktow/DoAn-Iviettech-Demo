import React from 'react';
import { Button, InputNumber, message, Rate, Form, Input, Spin, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useCustomeHistory from '../../hooks/useCustomHistory';

import { actGetProductById } from '../../redux/actions/productAction';
import '../../sass/_button.scss';
import Endow from '../../components/Endow';
import '../../sass/_product-detail.scss';
import { actAddMoreToCartSuccess } from '../../redux/actions/cartAction';
import { actCreateComment, actGetComment } from '../../redux/actions/commentAction';
import { showRating, discountPrice } from '../../components/Sale/ItemContent';

const { TextArea } = Input;

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function ProductDetail() {
    const dispatch = useDispatch();
    const { productDetail, isLoading } = useSelector((state) => state.productReducer);
    const comments = useSelector((state) => state.commentReducer.comments);
    const { isLoggIn, profile } = useSelector((state) => state.auth);
    const [chooseQuantity, setChooseQuantity] = React.useState(1);
    const [form] = Form.useForm();

    let sum = 0;
    for (let i = 0; i < comments.length; i++) {
        sum += comments[i].rating;
    }
    const tbRating = sum / comments.length;

    const history = useCustomeHistory();

    const handleChangeQuantity = (value) => {
        setChooseQuantity(value);
    };

    const handleClickBuy = () => {
        dispatch(actAddMoreToCartSuccess({ product: productDetail, chooseQuantity }));
        setChooseQuantity(null);
        message.success('Đã thêm vào giỏ hàng !');
    };

    React.useEffect(() => {
        dispatch(actGetComment(productDetail.id));
    }, [dispatch, productDetail.id]);

    const handleSubmitComment = (value) => {
        if (isLoggIn) {
            const comment = {
                idProduct: productDetail.id,
                description: value.yourComment,
                rating: value.yourRating,
                createAt: new Date().toLocaleString(),
                avatar: profile.avatar,
                nameCmt: profile.username,
                userId: profile.id,
            };
            dispatch(actCreateComment(comment));
        } else {
            message.warn('Bạn cần đăng nhập trước khi bình luận !');
        }
        form.resetFields();
    };

    const mapListReview = (reviews) => {
        return reviews.map((review) => {
            return (
                <>
                    <div className="info-rating">
                        <div className="user-rating">
                            <div className="user-review">
                                <img
                                    src={review.avatar || null}
                                    alt="avatar"
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                                ></img>
                                <h4 style={{ marginBottom: 0 }}>{review.nameCmt}</h4>
                                <span>{showRating(review.rating)}</span>
                            </div>
                        </div>
                        <div className="content-comment">
                            <p>{review.description}</p>
                            <span>{review.createAt}</span>
                        </div>
                    </div>
                </>
            );
        });
    };

    React.useEffect(() => {
        const { location } = history;
        const id = location.pathname.split('/')[2];
        dispatch(actGetProductById(id));
        // eslint-disable-next-line
    }, [dispatch, history.location.pathname]);

    return (
        <div className="product__detail">
            {!isLoading ? (
                <>
                    <div className="product__detail-row">
                        <div className="product__detail-img">
                            <img src={productDetail?.srcImage} alt={productDetail?.name} />
                        </div>
                        <div className="product__detail-desc">
                            <h1>{productDetail?.name}</h1>
                            <span className="price">
                                {discountPrice(productDetail)?.toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                            <p style={{ color: '#fadb14', margin: '10px 0' }}>
                                {!!comments.length ? (
                                    showRating(tbRating)
                                ) : (
                                    <span style={{ color: '#000' }}>Chưa có đánh giá</span>
                                )}
                            </p>
                            <p>
                                <strong>Thương hiệu:</strong>{' '}
                                {productDetail?.brand?.charAt(0).toUpperCase() + productDetail?.brand?.slice(1)}
                            </p>
                            <p>
                                <strong>Dung tích:</strong> {`${productDetail?.capacity}ml`}
                            </p>

                            <span>
                                <strong>Tags:</strong>{' '}
                            </span>
                            {productDetail?.tags?.map((tag) => (
                                <>
                                    <Tag color="#55acee">{capitalizeFirstLetter(tag)}</Tag>
                                </>
                            ))}
                            <form style={{ marginTop: '10px' }}>
                                <InputNumber
                                    min={1}
                                    max={10}
                                    value={chooseQuantity}
                                    onChange={handleChangeQuantity}
                                    className="input-number"
                                />
                                <Button className="btn-add-to-card" onClick={handleClickBuy}>
                                    THÊM VÀO GIỎ HÀNG
                                </Button>
                            </form>

                            <div className="product__detail-endow">
                                <Endow
                                    url={'https://clmensstore.com/wp-content/uploads/2022/06/Chinh-hang-300x300.png'}
                                    mainText={'Cam kết chính hãng'}
                                    subText={'Hoàn tiền 333% nếu phát hiện hàng giả'}
                                />
                                <Endow
                                    url={
                                        'https://clmensstore.com/wp-content/uploads/2022/06/Thiet-ke-chua-co-ten-8-300x300.png'
                                    }
                                    mainText={'Miễn phí vận chuyển'}
                                    subText={'Các đơn hàng trên 300K'}
                                />
                                <Endow
                                    url={
                                        'https://clmensstore.com/wp-content/uploads/2022/06/Thiet-ke-chua-co-ten-12-300x300.png'
                                    }
                                    mainText={'Tư vấn trực tiếp'}
                                    subText={'Chat trực tiếp với tư vấn viên'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="product__detail-info">
                        <div className="detail__text">
                            <span>THÔNG TIN SẢN PHẨM</span>
                        </div>
                        <div className="detail__desc">
                            <span>Nước hoa {productDetail?.name}</span>
                            <p>{productDetail?.description}</p>
                            <span>Thông tin về nước hoa {productDetail?.name}</span>
                            <ul>
                                <li>Giới tính: {productDetail.category}</li>
                                <li>
                                    Hãng sản xuất:{' '}
                                    {productDetail?.brand?.charAt(0).toUpperCase() + productDetail?.brand?.slice(1)}
                                </li>
                                <li>Dung tích: {productDetail.capacity}ml</li>
                            </ul>

                            <span>Đánh giá {productDetail?.name}</span>
                            <div className="list-review" style={{ padding: '20px 0' }}>
                                {mapListReview(comments)}
                            </div>
                            <div className="form-comment">
                                <Form onFinish={handleSubmitComment} layout={'vertical'} form={form}>
                                    <Form.Item
                                        rules={[{ required: true, message: 'Không được bỏ trống trường này !' }]}
                                        label={'Đánh giá của bạn'}
                                        name="yourRating"
                                    >
                                        <Rate></Rate>
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, message: 'Không được bỏ trống trường này !' }]}
                                        label={'Bình luận'}
                                        name="yourComment"
                                    >
                                        <TextArea
                                            rows={4}
                                            placeholder="Nêu nhận xét của bạn về sản phẩm tại đây..."
                                        ></TextArea>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button className="btn-add-to-card" htmlType="submit">
                                            BÌNH LUẬN
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Spin tip="Loading..." className="spin-detail"></Spin>
            )}
        </div>
    );
}
