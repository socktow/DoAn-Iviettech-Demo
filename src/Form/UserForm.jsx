import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Form, Input, Modal, Radio, Select, Spin, message } from 'antd';
import { createUser, updateUser } from '../apis/usersApi';
import { useSelector } from 'react-redux';

const UserForm = forwardRef(({ mode, reload }, modalRef) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const idUserRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const THEME = useSelector((state) => state.theme.theme);
    const isDark = Boolean(THEME === 'dark');

    const layout = {
        labelCol: {
            lg: {
                span: 4,
                offset: 0,
            },
            md: {
                span: 24,
                offset: 1,
            },
            sm: {
                span: 24,
                offset: 1,
            },
        },
        wrapperCol: {
            lg: {
                span: 16,
                offset: 0,
            },
            md: {
                span: 24,
                offset: 1,
            },
            sm: {
                span: 24,
                offset: 1,
            },
        },
    };

    useImperativeHandle(modalRef, () => {
        return {
            handleOpenModal,
        };
    });

    const handleOpenModal = (user) => {
        if (user) {
            idUserRef.current = user.id;
            const value = {
                ...user,
            };
            console.log(value);
            form.setFieldsValue(value);
        }
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
        form.resetFields();
    };

    const handleOkModal = () => {
        setVisible(false);
        form.resetFields();
    };

    const onEditUser = async (id, user) => {
        setIsLoading(true);
        try {
            const res = await updateUser(id, user);
            if (res.status === 200) {
                message.success('Edit user Success');
            } else {
                message.warning('Edit user fail');
            }
        } catch (error) {
            console.error(error);
            message.warning('Edit user fail');
        }
        reload();
        form.resetFields();
        setIsLoading(false);
        setVisible(false);
    };

    const onAddUser = async (user) => {
        setIsLoading(true);
        try {
            const res = await createUser(user);
            if (res.status === 201) {
                message.success('Add user Success');
                form.resetFields();
            } else {
                message.warning('Add user fail');
            }
        } catch (error) {
            console.error(error);
        }
        reload();
        setIsLoading(false);
        setVisible(false);
    };

    const onFinish = (value) => {
        const valueClone = { ...value };
        const user = {
            ...valueClone,
            id: `${idUserRef.current ? idUserRef.current : Math.floor(100000 + Math.random() * 900000)}`,
        };
        if (mode === 'ADD') {
            onAddUser(user);
        } else if (mode === 'EDIT') {
            onEditUser(idUserRef.current, user);
        }
    };

    return (
        <Modal
            title={`${mode === 'ADD' ? 'Add New User' : 'Edit User'}`}
            centered
            visible={visible}
            onOk={handleOkModal}
            onCancel={handleCloseModal}
            width="60%"
            bodyStyle={{
                backgroundColor: isDark ? '#001529' : '#fff',
            }}
        >
            <Spin spinning={isLoading} size="large" tip="Loading...">
                <Form
                    form={form}
                    {...layout}
                    name="order-form"
                    autoComplete="off"
                    onFinish={onFinish}
                    className={isDark ? 'dark-style' : 'light-style'}
                >
                    <Form.Item
                        name="username"
                        label="User Name"
                        rules={[
                            {
                                required: true,
                                message: 'User Name is required',
                            },
                        ]}
                    >
                        <Input disabled={mode === 'ADD' ? false : true} />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Gender is required',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select gender"
                            style={{ width: 250 }}
                            disabled={mode === 'ADD' ? false : true}
                        >
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="isAdmin"
                        label="Role"
                        rules={[
                            {
                                required: true,
                                message: 'Role is required',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={true}>Admin</Radio>
                            <Radio value={false}>Guest</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Email is required',
                                type: 'email',
                            },
                        ]}
                    >
                        <Input disabled={mode === 'ADD' ? false : true} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Password is required',
                                min: 6,
                            },
                        ]}
                    >
                        <Input.Password disabled={mode === 'ADD' ? false : true} />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Phone Number is required',
                                min: 10,
                            },
                        ]}
                    >
                        <Input disabled={mode === 'ADD' ? false : true} />
                    </Form.Item>
                    <Form.Item
                        name="avatar"
                        label="Avartar"
                        rules={[
                            {
                                required: true,
                                message: 'Avartar is required',
                            },
                        ]}
                    >
                        <Input disabled={mode === 'ADD' ? false : true} />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Address is required',
                            },
                        ]}
                    >
                        <Input disabled={mode === 'ADD' ? false : true} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                            offset: 10,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
});

export default UserForm;
