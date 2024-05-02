import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Form, Input, Modal, Select, message, Image, Table, Spin } from 'antd';
import { updateOrder } from '../apis/orderApi';
import { useSelector } from 'react-redux';

const OrderForm = forwardRef(({ reload }, modalRef) => {
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const THEME = useSelector((state) => state.theme.theme);
    const isDark = Boolean(THEME === 'dark');
    const [form] = Form.useForm();
    const idOrderRef = useRef(null);

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
    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'id',
        },
        {
            title: 'Product Image',
            dataIndex: 'srcImage',
            with: '7%',
            render: (srcImage) => <Image width={40} src={srcImage} preview={false} />,
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            render: (price) =>
                price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                }),
        },
        {
            title: 'Total Money',
            render: (_, record) =>
                (record.quantity * record.price).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                }),
        },
    ];
    useImperativeHandle(modalRef, () => {
        return {
            handleOpenModal,
        };
    });

    const handleOpenModal = (order) => {
        if (order) {
            idOrderRef.current = order.id;
            const value = {
                ...order,
            };
            setDataSource([...value.cart]);
            console.log('>>>Order', value);
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

    const onFinish = async (value) => {
        const orderUpdate = {
            ...value,
            cart: dataSource,
        };
        console.log('>>>update Order', orderUpdate);
        setIsLoading(true);
        try {
            const res = await updateOrder(idOrderRef.current, orderUpdate);
            if (res.status === 200) {
                message.success('Edit order Success');
            } else {
                message.warning('Edit order fail');
            }
        } catch (error) {
            console.error(error);
            message.warning('Edit order fail');
        }
        reload();
        form.resetFields();
        setIsLoading(false);
        setVisible(false);
    };
    return (
        <Modal
            title="Order Details"
            centered
            visible={visible}
            onOk={handleOkModal}
            onCancel={handleCloseModal}
            width="80%"
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
                    <Form.Item name="id" label="Order Code">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="username" label="Customer">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="idUser" label="User ID">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="createAt" label="Delivery Date">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="totalMoney" label="Delivery Pricing">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="paymentMethod" label="Payment Menthod">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone Number">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="address" label="Address">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="deliveryStatus" label="Delivery Status">
                        <Select placeholder="Select delivery status" style={{ width: 250 }}>
                            <Select.Option value="delivered">Delivered</Select.Option>
                            <Select.Option value="shipped">Shipped</Select.Option>
                            <Select.Option value="inTransit">In Transit</Select.Option>
                            <Select.Option value="canceled">Canceled</Select.Option>
                        </Select>
                    </Form.Item>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered
                        size="medium"
                        rowKey={(record) => record.id}
                        title={() => 'Orders'}
                        pagination={false}
                        style={{ marginBottom: 20 }}
                    ></Table>
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

export default OrderForm;
