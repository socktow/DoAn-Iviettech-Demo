import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Space, Table, Button, Popconfirm, message, Input, Image, Tooltip, Spin } from 'antd';
import { EditFilled, DeleteFilled, SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getAllUser, deleteUser } from '../../apis/usersApi';

const UserForm = React.lazy(() => import('../../Form/UserForm'));

const Users = () => {
    const THEME = useSelector((state) => state.theme.theme);
    const isDark = Boolean(THEME === 'dark');
    const modalRef = useRef(null);
    const [modeModal, setModeModal] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            with: '10%',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            with: '7%',
            render: (avatar) => <Image width={35} src={avatar} preview={false} />,
        },
        {
            title: 'Name',
            dataIndex: 'username',
            with: '10%',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
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
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => record.username.toLowerCase().startsWith(value.toLowerCase()),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            with: '10%',
        },
        {
            title: 'Role',
            dataIndex: 'isAdmin',
            with: '10%',
            filterMultiple: false,
            filters: [
                {
                    text: <span>Admin</span>,
                    value: true,
                },
                {
                    text: <span>Guest</span>,
                    value: false,
                },
            ],
            onFilter: (value, record) => {
                return record.isAdmin === value;
            },
            render: (isAdmin) => (isAdmin ? 'Admin' : 'Guest'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            with: '15%',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            with: '15%',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            with: '20%',
            render: (address) => (
                <Tooltip placement="topLeft" title={address} color={'#777'}>
                    {address}
                </Tooltip>
            ),
        },
        {
            title: 'Action',
            width: '10%',
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Button size="small" onClick={(e) => handleEditUser(record, e)}>
                        <EditFilled />
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title="Are you sure to delete this product?"
                        onConfirm={(e) => onDelete(record, e)}
                    >
                        <Button size="small">
                            <DeleteFilled />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const users = await getAllUser();
            console.log('>>> Users', users);
            setDataSource(users);
            setIsLoading(false);
            return users;
        } catch (error) {
            console.error('>>> Get users fail', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const onDelete = async (user, e) => {
        e.preventDefault();
        setIsLoading(true);

        if (user.isAdmin) {
            message.warning('Cannot delete ADMIN account');
            setIsLoading(false);
            return;
        }
        await deleteUser(user.id);
        message.success('Delete user success');
        fetchUsers();
        setIsLoading(false);
    };

    const handleAddUser = () => {
        setModeModal('ADD');
        modalRef.current?.handleOpenModal();
    };
    const handleEditUser = (user, e) => {
        e.preventDefault();
        setModeModal('EDIT');
        modalRef.current?.handleOpenModal(user);
    };
    return (
        <>
            <Suspense fallback={<Spin tip="Loading..."></Spin>}>
                <div className="new-user" style={{ marginBottom: 10 }}>
                    <Button type="primary" onClick={handleAddUser}>
                        Add new User
                    </Button>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    size="medium"
                    loading={isLoading}
                    bordered
                    pagination={{
                        pageSize: 15,
                        style: {
                            padding: '0 20px',
                        },
                    }}
                    rowKey={(record) => record.id}
                    className={`${isDark ? 'dark-style' : 'light-style'}`}
                ></Table>
                <UserForm ref={modalRef} mode={modeModal} reload={fetchUsers} />
            </Suspense>
        </>
    );
};

export default Users;
