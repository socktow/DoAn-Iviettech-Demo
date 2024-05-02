import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import './style.css';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/Router';
import { useDispatch, useSelector } from 'react-redux';
import { actLogin } from '../../redux/actions/authAction';

const AdminLoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isLoadingLogin, notif, isLoggIn } = useSelector((state) => state.auth);
    const onFinish = (values) => {
        // Check user, pass
        // Set token in localStorage
        dispatch(actLogin(values));

        if (values.username === 'admin' && values.password === '141213') {
            localStorage.setItem('admin_loggedIn', '*****');
            message.success('Welcome admin page!');
            history.push(ROUTES.DASHBOARD.path);
        } else message.error('Invalid User or Password');
    };

    return (
        <div className="admin__login">
            <div className="admin__login-form">
                <div className="form-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/3170/3170748.png" alt="" />
                    <h2>Admin User Login</h2>
                </div>
                <div className="form-input">
                    <Form
                        name="basic"
                        wrapperCol={{
                            span: 20,
                            offset: 2,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input placeholder="Username" size="large" prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" size="large" prefix={<KeyOutlined />} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 10,
                                span: 24,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="form-footer">
                    <p>Welcome to administration page, please login!</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
