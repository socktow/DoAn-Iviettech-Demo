import { UserTypes } from '../constants';

export const actGetUsers = (users) => {
    return {
        type: UserTypes.GET_ALL_USERS,
        payload: users,
    };
};

export const actGetUsersSuccess = (payload) => {
    return {
        type: UserTypes.GET_USERS_SUCCESS,
        payload,
    };
};

export const actGetUsersFail = () => {
    return {
        type: UserTypes.GET_USERS_FAIL,
    };
};

export const actCreateUser = (user) => {
    return {
        type: UserTypes.CREATE,
        payload: user,
    };
};

export const actCreateUserSuccess = () => {
    return {
        type: UserTypes.CREATE_SUCCESS,
    };
};

export const actCreateUserFail = () => {
    return {
        type: UserTypes.CREATE_FAIL,
    };
};

export const actSetLoading = () => {
    return {
        type: UserTypes.SET_IS_LOADING,
    };
};

export const actClearNotification = () => {
    return {
        type: UserTypes.CLEAR_NOTIFICATION,
    };
};

export const actUpdateUser = (payload) => {
    return {
        type: UserTypes.UPDATE_USER,
        payload: payload,
    };
};

export const actUpdateUserSuccess = (payload) => {
    return {
        type: UserTypes.UPDATE_USER_SUCCESS,
    };
};

export const actUpdateUserFail = () => {
    return {
        type: UserTypes.UPDATE_USER_FAIL,
    };
};
