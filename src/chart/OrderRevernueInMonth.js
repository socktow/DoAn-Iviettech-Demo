import React from 'react';
import { DualAxes } from '@ant-design/plots';
import { OrderData, RevenueData } from './Data';

const OrderRevernueInMonth = () => {
    const x = RevenueData.map((data) => data.month);
    const y = x.map((datax) => OrderData.filter((data) => data.month === datax));
    const z = y.map((datay) => datay.map((data) => data.order));
    const w = z.map((dataz) => dataz.reduce((total, order) => total + order), 0);
    const t = RevenueData.map((data, indext) => {
        return {
            ...data,
            order: w.filter((_, indexw) => indext === indexw)[0],
        };
    });
    const data = t;
    const config = {
        data: [data, data],
        xField: 'month',
        yField: ['order', 'revenue'],
        geometryOptions: [
            {
                geometry: 'column',
                color: '#5B8FF9',
            },
            {
                geometry: 'line',
                color: '#5AD8A6',
            },
        ],
    };
    return <DualAxes {...config} />;
};

export default OrderRevernueInMonth;
