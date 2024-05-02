import { all } from '@redux-saga/core/effects';
import productSaga from './productSaga';
import userSaga from './userSaga';
import authSaga from './authSaga';
import orderSaga from './orderSaga';
import commentSaga from './commentSaga';

function* rootSaga() {
    yield all([...productSaga, ...userSaga, ...authSaga, ...orderSaga, ...commentSaga]);
}

export default rootSaga;
