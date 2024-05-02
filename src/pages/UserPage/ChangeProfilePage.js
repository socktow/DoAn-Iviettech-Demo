import { actUpdateUser } from '../../redux/actions/userAction';
import '../../sass/_change-profile.scss';
import '../../sass/_button.scss';

import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select;

const valid = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export default function ChangeProfilePage() {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.auth);
    const [form] = Form.useForm();
    const [loadings, setLoadings] = React.useState([]);
    const [isChangePassword, setIsChangePassword] = React.useState(false);
    const fieldProfile = { ...profile };
    delete fieldProfile.password;

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

    const handleUpdateProfile = (values) => {
        const payload = {
            username: values.username,
            email: values.email,
            password: values.password || profile?.password,
            phone: values.phone,
            address: values.address,
            gender: values.gender,
            avatar: values.avatar,
            isAdmin: profile?.isAdmin,
        };

        dispatch(actUpdateUser({ id: profile.id, payload: payload }));
        form.resetFields();
    };

    React.useEffect(() => {
        form.setFieldsValue(fieldProfile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    return (
        <div className="change__profile">
            <div className="change__profile-content">
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>THAY ĐỔI THÔNG TIN CÁ NHÂN CỦA BẠN</p>
                <Form
                    form={form}
                    name="change-profile"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    layout={'vertical'}
                    onFinish={handleUpdateProfile}
                >
                    <Form.Item label="Tên đăng nhập" name="username" hasFeedback>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: `Email không hợp lệ !`,
                            },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <Button
                        className="btn-add-to-card "
                        onClick={() => setIsChangePassword(!isChangePassword)}
                        style={{ marginBottom: '16px' }}
                    >
                        ĐỔI MẬT KHẨU
                    </Button>

                    {isChangePassword && (
                        <>
                            <Form.Item
                                label="Mật khẩu cũ"
                                name="old-password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống trường này !',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || `${profile?.password}` === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Mật khẩu cũ không chính xác !');
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống trường này !',
                                    },
                                    {
                                        min: 6,
                                        message: 'Mật khẩu phải có ít nhất 6 ký tự !',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Nhập lại mật khẩu"
                                name="retype-password"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống trường này !',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Mật khẩu nhập lại không chính xác !');
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item label="Địa chỉ" name="address" hasFeedback>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            () => ({
                                validator(_, value) {
                                    if (!value || value.match(valid)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Số điện thoại không hợp lệ !');
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Chọn giới tính" name="gender" hasFeedback>
                        <Select placeholder="Chọn giới tính của bạn..." allowClear>
                            <Option value="male">Nam</Option>
                            <Option value="female">Nữ</Option>
                            <Option value="other">Khác</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="avatar" label="Ảnh đại diện">
                        <Input placeholder="Dán URL hình ảnh vào đây !!!" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button
                            className="btn-add-to-card "
                            htmlType="submit"
                            loading={loadings[0]}
                            onClick={() => enterLoading(0)}
                        >
                            LƯU THAY ĐỔI
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
