import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import ItemContent from '../Sale/ItemContent';

import '../../sass/_carousel.scss';
import SkeletonLoading from '../Skeleton';

export const filTagProduct = (tagFil, products) => {
    const filterTagsName = products?.filter((product) => product?.tags.includes(tagFil));
    const renderTag = tagFil ? filterTagsName : products;
    return renderTag;
};

export default function Carousel({ tagFil, products, isLoading }) {
    return (
        <div className="carousel">
            <Swiper
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },

                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },

                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },

                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                }}
            >
                {!!filTagProduct(tagFil, products)?.length
                    ? filTagProduct(tagFil, products)?.map((product) => (
                          <SwiperSlide key={product?.id}>
                              {!isLoading ? (
                                  <ItemContent product={product} title={'THÊM VÀO GIỎ HÀNG'} />
                              ) : (
                                  <>
                                      <SkeletonLoading />
                                  </>
                              )}
                          </SwiperSlide>
                      ))
                    : 'No product'}
            </Swiper>
        </div>
    );
}
