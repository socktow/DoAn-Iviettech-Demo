import { AuthTypes } from '../constants';

const initialState = {
    profile: {},
    isLoggIn: false,
    isAuthenticated: false,
    isLoadingLogin: false,
    notif: '',
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthTypes.LOGIN_SUCCESS: {
            const profile = action.payload.profile;
            const accessToken = action.payload.token;
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            profile.isAdmin && localStorage.setItem('admin_loggedIn', '****');
            state = {
                profile: profile,
                isLoggIn: true,
                isAuthenticated: profile.isAdmin,
                isLoadingLogin: false,
                notif: 'Đăng nhập thành công !',
            };
            return { ...state };
        }
        case AuthTypes.GET_PROFILE_SUCCESS: {
            const profile = action.payload.profile;
            state = {
                ...state,
                profile: profile,
                isLoggIn: true,
                isAuthenticated: profile.isAdmin,
            };
            return { ...state };
        }

        case AuthTypes.LOGOUT: {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('admin_loggedIn');
            return { ...initialState };
        }

        case AuthTypes.GET_PROFILE_FAIL: {
            return { ...initialState };
        }

        case AuthTypes.LOGIN_FAIL: {
            return { ...state, isLoadingLogin: false, notif: 'Đăng nhập thất bại !' };
        }

        case AuthTypes.SET_IS_LOADING: {
            return { ...state, isLoadingLogin: true };
        }

        default:
            return { ...state };
    }
};
