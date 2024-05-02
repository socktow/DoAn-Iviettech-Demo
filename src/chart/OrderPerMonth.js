import React from 'react';
import { Area } from '@ant-design/plots';
import { OrderData } from './Data';

const OrderPerMonth = () => {
    const data = OrderData;
    const config = {
        data,
        xField: 'month',
        yField: 'order',
        seriesField: 'brand',
        smooth: true,
    };
    return <Area {...config} />;
};

export default OrderPerMonth;
