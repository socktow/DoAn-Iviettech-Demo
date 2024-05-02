import React from 'react';
import { filTagProduct } from '../Carousel';
import ItemContent from './ItemContent';

export default function ListItem({ tagFil, products }) {
    return (
        <>
            {!!products?.length
                ? filTagProduct(tagFil, products)
                      .slice(0, 5)
                      ?.map((product) => <ItemContent key={product.id} title={'THÊM VÀO GIỎ HÀNG'} product={product} />)
                : 'Không có sản phẩm !'}
        </>
    );
}
