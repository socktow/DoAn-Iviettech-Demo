import React from 'react';
import { Drawer } from 'antd';
import DrawerItem from './DrawerItem';

export default function SideDrawer(props) {
    const onClose = () => {
        props.setDrawerVisible(false);
    };
    return (
        <Drawer title="GIỎ HÀNG" placement="right" onClose={onClose} visible={props.drawerVisible}>
            <DrawerItem />
        </Drawer>
    );
}
