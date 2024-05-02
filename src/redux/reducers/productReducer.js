import { ProductTypes } from '../constants';

const initialState = {
    isLoading: false,
    productDetail: {},
    products: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ProductTypes.GET_PRODUCT_HOME_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                products: action.payload.products,
            };
        }
        case ProductTypes.GET_PRODUCT_BY_ID_SUCCESS: {
            return { ...state, isLoading: false, productDetail: { ...action.payload } };
        }
        case ProductTypes.GET_PRODUCT_BY_ID_FAIL: {
            window.location.href = '/';
            return { ...state, isLoading: false };
        }
        case ProductTypes.SET_IS_LOADING: {
            return { ...state, isLoading: true };
        }
        default:
            return { ...state };
    }
};

export default productReducer;
