export const ProductTypes = {
    GET_PRODUCT: 'GET_PRODUCT',
    GET_PRODUCT_SUCCESS: 'GET_PRODUCT_SUCCESS',
    GET_PRODUCT_BY_ID: 'GET_PRODUCT_BY_ID',
    GET_PRODUCT_BY_ID_SUCCESS: 'GET_PRODUCT_BY_ID_SUCCESS',
    GET_PRODUCT_BY_ID_FAIL: 'GET_PRODUCT_BY_ID_FAIL',
    GET_PRODUCT_HOME: 'GET_PRODUCT_HOME',
    GET_PRODUCT_HOME_SUCCESS: 'GET_PRODUCT_HOME_SUCCESS',
    SET_IS_LOADING: 'SET_IS_LOADING_PRODUCT',
    CHANGE_PAGE_PRODUCT: 'CHANGE_PAGE_PRODUCT',
    CHANGE_PAGE_PRODUCT_SUCCESS: 'CHANGE_PAGE_PRODUCT_SUCCESS',
    FILTER_PRODUCT: 'FILTER_PRODUCT_PAGE',
    FILTER_PRODUCT_SUCCESS: 'FILTER_PRODUCT_PAGE_SUCCESS',
};

export const UserTypes = {
    CREATE: 'CREATE_USER',
    CREATE_FAIL: 'CREATE_USER_FAIL',
    CREATE_SUCCESS: 'CREATE_USER_SUCCESS',
    SET_IS_LOADING: 'SET_IS_LOADING_USER',
    CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION_USER',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',
};

export const AuthTypes = {
    LOGIN: 'LOGIN',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    GET_PROFILE: 'GET_PROFILE',
    GET_PROFILE_FAIL: 'GET_PROFILE_FAIL',
    GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
    SET_IS_LOADING: 'SET_IS_LOADING_AUTH',
};

export const CartTypes = {
    ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',
    REMOVE_TO_CART_SUCESS: 'REMOVE_TO_CART_SUCESS',
    ADD_MORE_TO_CART_SUCCESS: 'ADD_MORE_TO_CART_SUCCESS',
    CHANGE_QUANTITY_CART_SUCESS: 'CHANGE_QUANTITY_CART_SUCESS',
    CLEAR_ALL_CART_SUCCESS: 'CLEAR_ALL_CART_SUCCESS',
};

export const OrderTypes = {
    CREATE_ORDER: 'CREATE_ORDER',
    CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
    CREATE_ORDER_FAIL: 'CREATE_ORDER_FAIL',
    GET_ORDERS_BY_USER: 'GET_ORDERS_BY_USER',
    GET_ORDERS_BY_USER_SUCCESS: 'GET_ORDERS_BY_USER_SUCCESS',
    SET_IS_LOADING: 'SET_IS_LOADING_ORDER',
    SET_NOTIFICATION_ORDER: 'SET_NOTIFICATION_ORDER',
};

export const CommentTypes = {
    CREATE_COMMENT: 'CREATE_COMMENT',
    CREATE_COMMENT_SUCCESS: 'CREATE_COMMENT_SUCCESS',
    GET_COMMENT_BY_PRODUCT: 'GET_COMMENT_BY_PRODUCT',
    GET_COMMENT_BY_PRODUCT_SUCCESS: 'GET_COMMENT_BY_PRODUCT_SUCCESS',
    SET_IS_LOADING: 'SET_IS_LOADING_COMMENT',
};
