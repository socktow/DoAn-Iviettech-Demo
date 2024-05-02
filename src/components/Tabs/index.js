import ItemContent from '../Sale/ItemContent';
import '../../sass/_tabs.scss';

import { Tabs } from 'antd';
import React from 'react';
import { filTagProduct } from '../Carousel';
import SkeletonLoading from '../Skeleton';
const { TabPane } = Tabs;

export default function TabsProduct({ products, isLoading }) {
    const season = ['Spring', 'Summer', 'Autumn', 'Winter'];

    return (
        <div className="tabs-product">
            <Tabs defaultActiveKey="1">
                {season.map((season, index) => (
                    <TabPane key={index} tab={season} className="tabs-grid">
                        {!isLoading ? (
                            !!filTagProduct(season.toLowerCase(), products)?.length ? (
                                filTagProduct(season.toLowerCase(), products)?.map((product) => (
                                    <ItemContent key={product.id} title={'THÊM VÀO GIỎ HÀNG'} product={product} />
                                ))
                            ) : (
                                'No product'
                            )
                        ) : (
                            <>
                                <SkeletonLoading />
                            </>
                        )}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
}
