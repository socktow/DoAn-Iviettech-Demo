import React from 'react';
import { Skeleton } from 'antd';
import './_skeleton.scss';

export default function SkeletonLoading() {
    return (
        <div className="skeleton-loading">
            <Skeleton.Image style={{ marginBottom: '10px' }} />
            <Skeleton active />
        </div>
    );
}
