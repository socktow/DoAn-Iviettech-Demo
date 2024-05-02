import { combineReducers } from 'redux';
import productReducer from './productReducer';
import { userReducer } from './userReducer';
import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';
import { commentReducer } from './commentReducer';
import themeReducer from './theme';

const appReducers = combineReducers({
    productReducer: productReducer,
    user: userReducer,
    auth: authReducer,
    cartReducer: cartReducer,
    orderReducer: orderReducer,
    commentReducer: commentReducer,
    theme: themeReducer,
});

export default appReducers;
