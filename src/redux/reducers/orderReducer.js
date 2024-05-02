import { OrderTypes } from '../constants';

const initialState = {
    isLoading: false,
    order: {},
    orders: [],
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case OrderTypes.SET_IS_LOADING: {
            return { ...state, isLoading: true };
        }
        case OrderTypes.CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                order: { ...action.payload.order },
                isLoading: false,
            };
        }
        case OrderTypes.GET_ORDERS_BY_USER_SUCCESS: {
            return { ...state, orders: [...action.payload], isLoading: false };
        }
        case OrderTypes.CREATE_ORDER_FAIL: {
            return { ...state, isLoading: false };
        }
        case OrderTypes.SET_NOTIFICATION_ORDER: {
            return { ...state };
        }
        default:
            return { ...state };
    }
};
