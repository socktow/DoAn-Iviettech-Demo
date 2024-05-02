import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Space, Table, Button, Popconfirm, message, Input, Tooltip, Image, Spin } from 'antd';
import { EditFilled, DeleteFilled, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductById } from '../../apis/productsApi';
import { ProductTypes } from '../../redux/constants';
import './style.css';

const ProductForm = React.lazy(() => import('../../Form/ProductForm'));

const Products = () => {
    const { Column } = Table;
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.productReducer);
    const THEME = useSelector((state) => state.theme.theme);
    const isDark = Boolean(THEME === 'dark');
    const [isLoading, setIsLoading] = useState(false);
    const [modeModal, setModeModal] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        dispatch({ type: ProductTypes.GET_PRODUCT_HOME });
    };

    // ----------------------

    const handleAddProduct = () => {
        setModeModal('ADD');
        modalRef.current?.handleOpenModal();
    };
    const handleEditProduct = (product, e) => {
        e.preventDefault();
        setModeModal('EDIT');
        modalRef.current?.handleOpenModal(product);
    };
    const handleDeleteProduct = async (id, e) => {
        e.preventDefault();
        setIsLoading(true);
        await deleteProductById(id);
        message.success('Delete product success');
        fetchProducts();
        setIsLoading(false);
    };

    return (
        <>
            <Suspense fallback={<Spin tip="Loading..."></Spin>}>
                <div className="new-product" style={{ marginBottom: 10 }}>
                    <Button type="primary" onClick={handleAddProduct}>
                        Add new product
                    </Button>
                </div>
                <Table
                    dataSource={[...products]}
                    size="medium"
                    pagination={{
                        pageSize: 15,
                        style: {
                            padding: '0 20px',
                        },
                    }}
                    rowKey={(record) => record.id}
                    loading={isLoading}
                    className={`${isDark ? 'dark-style' : 'light-style'}`}
                    bordered={true}
                >
                    <Column title="ID" dataIndex="id" key="id" width="10%" />
                    <Column
                        title="Image"
                        dataIndex="srcImage"
                        key="srcImage"
                        width="7%"
                        render={(srcImage) => <Image width={40} src={srcImage} preview={false} />}
                    />
                    <Column
                        title="Name"
                        dataIndex="name"
                        key="productName"
                        width="20%"
                        ellipsis={{
                            showTitle: false,
                        }}
                        render={(name) => (
                            <Tooltip placement="topLeft" title={name} color={'#777'}>
                                {name}
                            </Tooltip>
                        )}
                        filterDropdown={({ setSelectedKeys, selectedKeys, confirm }) => {
                            return (
                                <Input
                                    autoFocus
                                    placeholder="Search..."
                                    value={selectedKeys[0]}
                                    onChange={(e) => {
                                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                                        confirm({ closeDropdown: false });
                                    }}
                                    onPressEnter={() => confirm()}
                                ></Input>
                            );
                        }}
                        filterIcon={() => {
                            return <SearchOutlined />;
                        }}
                        onFilter={(value, record) => record.name.toLowerCase().includes(value.toLowerCase())}
                    />
                    <Column
                        title="Category"
                        dataIndex="category"
                        key="category"
                        filters={[
                            {
                                text: <span>Men's</span>,
                                value: "men's",
                            },
                            {
                                text: <span>Women's</span>,
                                value: "women's",
                            },
                        ]}
                        onFilter={(value, record) => record.category.startsWith(value)}
                        width="10%"
                    />
                    <Column
                        title="Brand"
                        dataIndex="brand"
                        key="brand"
                        filters={[
                            {
                                text: <span>Dior</span>,
                                value: 'dior',
                            },
                            {
                                text: <span>Chanel</span>,
                                value: 'chanel',
                            },
                            {
                                text: <span>Gucci</span>,
                                value: 'gucci',
                            },
                            {
                                text: <span>Prada</span>,
                                value: 'prada',
                            },
                            {
                                text: <span>YSL</span>,
                                value: 'ysl',
                            },
                            {
                                text: <span>Versace</span>,
                                value: 'versace',
                            },
                            {
                                text: <span>Other...</span>,
                                value: 'other',
                            },
                        ]}
                        onFilter={(value, record) => record.brand.includes(value)}
                        width="10%"
                    />
                    <Column
                        title="Price (VND)"
                        dataIndex="price"
                        key="price"
                        sorter={(a, b) => a.price - b.price}
                        width="10%"
                        render={(price) =>
                            price.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })
                        }
                    />
                    <Column title="Discount (%)" dataIndex="discount" key="discount" width="10%" />
                    <Column
                        title="Capacity (ml)"
                        dataIndex="capacity"
                        key="capacity"
                        sorter={(a, b) => a.capacity - b.capacity}
                        width="10%"
                    />
                    <Column
                        title="Action"
                        key="action"
                        width="7%"
                        align="center"
                        render={(_, record) => (
                            <Space size="small">
                                <Button size="small" onClick={(e) => handleEditProduct(record, e)}>
                                    <EditFilled />
                                </Button>
                                <Popconfirm
                                    placement="topRight"
                                    title="Are you sure to delete this product?"
                                    onConfirm={(e) => handleDeleteProduct(record.id, e)}
                                >
                                    <Button size="small">
                                        <DeleteFilled />
                                    </Button>
                                </Popconfirm>
                            </Space>
                        )}
                    />
                </Table>
                <ProductForm ref={modalRef} mode={modeModal} reload={fetchProducts} />
            </Suspense>
        </>
    );
};

export default Products;
