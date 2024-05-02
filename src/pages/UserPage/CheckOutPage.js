import '../../sass/_checkout.scss';
import '../../sass/_button.scss';

import React from 'react';
import { Button, Form, Input, message, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actCreateOrder } from '../../redux/actions/orderAction';
import { discountPrice } from '../../components/Sale/ItemContent';

const valid = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default function CheckOutPage() {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cartReducer);
    const { isLoggIn, profile } = useSelector((state) => state.auth);
    const [paymentMethod, setPaymentMethod] = React.useState(1);
    const [form] = Form.useForm();
    const [loadings, setLoadings] = React.useState([]);

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 2000);
    };

    const totalMoney = cart.reduce((total, product) => {
        total += discountPrice(product) * product.quantity;
        return total;
    }, 0);

    const onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        setPaymentMethod(e.target.value);
    };

    const onCheckout = (value) => {
        const infoShip = { ...value };
        delete infoShip.bankNumber;
        delete infoShip.bankName;
        delete infoShip.momoNumber;
        const order = {
            createAt: new Date().toLocaleDateString(undefined, options),
            idUser: profile.id,
            cart: [...cart],
            totalMoney: totalMoney,
            deliveryStatus: 'shipped',
            paymentMethod:
                paymentMethod === 1 ? 'Ship COD' : paymentMethod === 2 ? 'Thanh toán thẻ ngân hàng' : 'Thanh toán MoMo',
            ...infoShip,
        };

        if (isLoggIn) {
            setTimeout(() => {
                dispatch(actCreateOrder(order));
                message.success('Đặt hàng thành công !');
            }, 2000);
        } else {
            message.warning('Bạn cần phải đăng nhập trước khi thanh toán !');
        }

        form.resetFields();
    };

    React.useEffect(() => {
        form.setFieldsValue(profile);
        // eslint-disable-next-line
    }, [profile]);

    return (
        <div className="checkout">
            <div className="checkout__col">
                <div className="col__info-cus">
                    <h3>THANH TOÁN VÀ GIAO HÀNG</h3>
                    <Form
                        form={form}
                        name="checkout"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        layout={'vertical'}
                        autoComplete="off"
                        onFinish={onCheckout}
                    >
                        <Form.Item
                            label="Tên"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống trường này !',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại "
                            name="phone"
                            rules={[
                                { required: true, message: 'Không được bỏ trống trường này !' },
                                () => ({
                                    validator(_, value) {
                                        if (!value || value.match(valid)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Số điện thoại không hợp lệ !');
                                    },
                                }),
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống trường này !',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ email "
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ !',
                                },
                                {
                                    required: true,
                                    message: 'Không được bỏ trống trường này !',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Radio.Group value={paymentMethod} onChange={onChangeRadio} width="100%">
                            <Space direction="vertical">
                                <Radio value={1}>Thanh toán khi nhận hàng (COD)</Radio>
                                <Radio value={2}>
                                    Chuyển khoản ngân hàng
                                    {paymentMethod === 2 ? (
                                        <>
                                            <Form.Item
                                                name="bankNumber"
                                                style={{ minWidth: '400px' }}
                                                label={'Số tài khoản'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Không được để trống trường này !',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                name="bankName"
                                                label={'Tên ngân hàng'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Không được để trống trường này !',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </>
                                    ) : null}
                                </Radio>
                                <Radio value={3}>
                                    Thanh toán bằng Ví điện tử MoMo{' '}
                                    <img src="https://static.momo.vn/momo.ico" height="32px" width="32px" alt="Momo" />
                                    {paymentMethod === 3 ? (
                                        <>
                                            <Form.Item
                                                name="momoNumber"
                                                label={'Mã MoMo'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Không được để trống trường này !',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </>
                                    ) : null}
                                </Radio>
                            </Space>
                        </Radio.Group>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        ></Form.Item>
                        <Button
                            className="btn-add-to-card checkout-btn"
                            htmlType="submit"
                            loading={loadings[0]}
                            onClick={() => enterLoading(0)}
                        >
                            ĐẶT HÀNG
                        </Button>
                    </Form>
                </div>
                <div className="col__cart-checkout">
                    <div className="checkout-your-cart">
                        <h3>ĐƠN HÀNG CỦA BẠN</h3>
                        <p>Sản phẩm</p>
                        <div className="your-product">
                            {!!cart.length
                                ? cart?.map((item) => (
                                      <div className="your-product-item" key={item?.id}>
                                          <img src={item?.srcImage} alt={item?.name} height={'60px'} width={'60px'} />
                                          <span style={{ fontSize: '14px', minWidth: '400px' }}>
                                              {item?.name}
                                              <strong> x {item?.quantity}</strong>
                                          </span>
                                          <span>
                                              <strong>
                                                  {(discountPrice(item) * item?.quantity).toLocaleString('it-IT', {
                                                      style: 'currency',
                                                      currency: 'VND',
                                                  })}
                                              </strong>
                                          </span>
                                      </div>
                                  ))
                                : null}
                        </div>
                        <h3>Tổng tiền: {totalMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
