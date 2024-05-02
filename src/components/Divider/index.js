import React from 'react';
import { Divider as Line } from 'antd';

import '../../sass/_divider.scss';

export default function Divider({ divider }) {
    return (
        <div className="divider">
            <Line plain style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {divider}
            </Line>
        </div>
    );
}
