const initialState = {
    theme: localStorage.getItem('theme') || 'dark',
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'theme/dark': {
            return {
                ...state,
                theme: 'dark',
            };
        }
        case 'theme/light': {
            return {
                ...state,
                theme: 'light',
            };
        }
        default: {
            return state;
        }
    }
};

export default themeReducer;
