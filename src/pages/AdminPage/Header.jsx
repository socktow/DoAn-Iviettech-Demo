import React from 'react';
import { Avatar, message, Dropdown, Menu, Space } from 'antd';
import { SettingOutlined, LogoutOutlined, CaretDownOutlined, AlignLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actLogout } from '../../redux/actions/authAction';

const Heading = () => {
    const dispatch = useDispatch();
    const THEME = useSelector((state) => state.theme.theme);
    const isDark = Boolean(THEME === 'dark');
    let history = useHistory();
    const handleMenuClick = (e) => {
        if (e.key === '0') {
            history.push('/');
        } else if (e.key === '1') {
            message.success('Change Avatar Success!');
        } else if (e.key === '2') {
            dispatch(actLogout());
            localStorage.removeItem('admin_loggedIn');
            localStorage.removeItem('accessToken');
            history.push('/');
            message.success('Welcome home page');
        }
    };
    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Home Page',
                    key: '0',
                    icon: <AlignLeftOutlined />,
                },
                {
                    label: 'Change Avatar',
                    key: '1',
                    icon: <SettingOutlined />,
                },
                {
                    label: 'Logout',
                    key: '2',
                    icon: <LogoutOutlined />,
                },
            ]}
        />
    );
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <img
                    src="https://clmensstore.com/wp-content/uploads/2018/07/37717589_818810961642335_8791362317594918912_n.png"
                    style={{ width: 80 }}
                    alt=""
                />
            </div>
            <div>
                <Avatar
                    src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"
                    style={{ width: 32 }}
                />
                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                    <span>
                        <Space>
                            <span
                                style={{
                                    color: isDark ? '#fff' : '#001529',
                                    fontSize: 18,
                                    marginLeft: 10,
                                    cursor: 'pointer',
                                }}
                            >
                                Admintrator
                            </span>
                            <CaretDownOutlined style={{ color: isDark ? '#fff' : '#001529' }} />
                        </Space>
                    </span>
                </Dropdown>
            </div>
        </div>
    );
};

export default Heading;
