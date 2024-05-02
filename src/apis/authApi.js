import axiosClient from '../utils/axiosClient';

export const logIn = async (username, password) => {
    const { data } = await axiosClient.post('login', {
        username: username,
        password: password,
    });
    return data;
};
