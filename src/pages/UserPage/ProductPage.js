/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../sass/_products.scss';
import ItemContent from '../../components/Sale/ItemContent';
import { actGetProductsHome } from '../../redux/actions/productAction';

import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Slider } from 'antd';
import ListSkeleton from '../../components/Skeleton/ListSkeleton';

export default function ProductPage() {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = React.useState([0, 10000000]);
    const { products, isLoading } = useSelector((state) => state.productReducer);
    const [prodBrand, setProdBrand] = React.useState([]);
    const [visibleCheck, setVisibleCheck] = React.useState(true);
    const [isActive, setIsActive] = React.useState();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const checkBrand = (brand) => {
        const result = products.filter((product) => product?.brand === brand);
        setIsActive(brand);
        setVisibleCheck(false);
        setProdBrand(result);
    };

    const resetStatus = () => {
        setVisibleCheck(true);
        setIsActive('ALL');
    };

    React.useEffect(() => {
        dispatch(actGetProductsHome());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const onChange = (newValue) => {
        setInputValue(newValue);
    };

    const uniqueIds = [];

    const unique = products.filter((element) => {
        const isDuplicate = uniqueIds.includes(element.brand);

        if (!isDuplicate) {
            uniqueIds.push(element.brand);
            return true;
        }

        return false;
    });

    const marks = {
        0: {
            style: {
                color: '#255c45',
            },
            label: (
                <strong className="price-left">
                    {inputValue[0]?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                </strong>
            ),
        },

        10000000: {
            style: {
                color: '#255c45',
            },
            label: (
                <strong className="price-right">
                    {inputValue[1]?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                </strong>
            ),
        },
    };

    return (
        <div className="products">
            <div className="products__content">
                {visibleCheck ? (
                    <>
                        <div className="product__items">
                            {!isLoading ? (
                                !!products.length ? (
                                    products
                                        .filter(
                                            (product) =>
                                                product.price >= parseInt(inputValue[0]) &&
                                                product.price < parseInt(inputValue[1]),
                                        )
                                        .map((product) => (
                                            <>
                                                <ItemContent key={product?.id} product={product} />
                                            </>
                                        ))
                                ) : (
                                    'Không có sản phẩm !'
                                )
                            ) : (
                                <>
                                    <ListSkeleton />
                                    <ListSkeleton />
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="product__items">
                        {!!prodBrand.length
                            ? prodBrand
                                  .filter(
                                      (product) =>
                                          product.price > parseInt(inputValue[0]) &&
                                          product.price < parseInt(inputValue[1]),
                                  )
                                  .map((product) => <ItemContent key={product?.id} product={product} />)
                            : 'Không có sản phẩm !'}
                    </div>
                )}
                <div className="product__list">
                    <h4>LỌC THEO GIÁ</h4>
                    <Row>
                        <Col span={24}>
                            <Slider
                                range
                                defaultValue={[0, 2000000]}
                                min={0}
                                step={5000}
                                max={10000000}
                                onChange={onChange}
                                marks={marks}
                            />
                        </Col>
                    </Row>
                    <h4>DANH MỤC SẢN PHẨM</h4>
                    <ul className="category__list">
                        <li
                            onClick={resetStatus}
                            className={`${isActive === 'ALL' ? 'active-style' : 'non-active-style'}`}
                        >
                            {' '}
                            <a href="#">ALL</a>
                        </li>
                        {!!unique?.length
                            ? unique?.map((product) => (
                                  <>
                                      <li
                                          key={product?.id}
                                          onClick={() => checkBrand(product?.brand)}
                                          className={`${
                                              isActive === product?.brand ? 'active-style' : 'non-active-style'
                                          }`}
                                      >
                                          <a href="#">{capitalizeFirstLetter(product?.brand)}</a>
                                      </li>
                                  </>
                              ))
                            : 'Danh mục sản phẩm trống !'}
                    </ul>
                </div>
            </div>
        </div>
    );
}
