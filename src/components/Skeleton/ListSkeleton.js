import React from 'react';

import SkeletonLoading from './index';

export default function ListSkeleton() {
    return (
        <>
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
        </>
    );
}
