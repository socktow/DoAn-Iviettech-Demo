import { Carousel } from 'antd';
import React from 'react';

import '../../sass/_header.scss';
import '../../sass/_slide.scss';

export default function Slide() {
    return (
        <section className="slide">
            <Carousel autoplay>
                <div className="slide__item">
                    <img
                        src="https://clmensstore.com/wp-content/uploads/2022/06/mua-1-tang-1-dauntless-2500-×-1000-px-1.png"
                        alt="Slide1"
                    />
                </div>
                <div className="slide__item">
                    <img src="https://clmensstore.com/wp-content/uploads/2022/06/06-6-2022-1.png" alt="Slide2" />
                </div>
                <div className="slide__item">
                    <img
                        src="https://clmensstore.com/wp-content/uploads/2021/11/White-Winter-Sale-Facebook-Post-2000-x-1000-px-1.png"
                        alt="Slide3"
                    />
                </div>
                <div className="slide__item">
                    <img src="https://clmensstore.com/wp-content/uploads/2021/11/chu-trang123123.jpg" alt="Slide4" />
                </div>
            </Carousel>
        </section>
    );
}
