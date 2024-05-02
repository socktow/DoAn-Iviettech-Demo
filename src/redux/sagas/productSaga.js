import { call, put, takeEvery } from '@redux-saga/core/effects';
import { getProductById, getProducts } from '../../apis/productsApi';
import { ProductTypes } from '../constants';
import {
    actGetProductByIdFail,
    actGetProductByIdSuccess,
    actGetProductsHomeSuccess,
    actSetLoading,
} from '../../redux/actions/productAction';

function* getProductsHome() {
    yield put(actSetLoading());
    const [resAllProducts] = yield Promise.all([getProducts()]);
    yield put(
        actGetProductsHomeSuccess({
            products: resAllProducts.data,
        }),
    );
}

function* getProductId({ payload }) {
    yield put(actSetLoading());
    try {
        const product = yield call(getProductById, payload);
        yield put(actGetProductByIdSuccess(product));
    } catch (error) {
        yield put(actGetProductByIdFail());
    }
}

function* watchGetProductHome() {
    yield takeEvery(ProductTypes.GET_PRODUCT_HOME, getProductsHome);
}

function* watchGetProductId() {
    yield takeEvery(ProductTypes.GET_PRODUCT_BY_ID, getProductId);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [watchGetProductHome(), watchGetProductId()];
