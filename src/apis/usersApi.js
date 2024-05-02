import axiosClient from '../utils/axiosClient';

export const getAllUser = async (payload) => {
    const { data } = await axiosClient.get('users', { params: { ...payload } });
    return data;
};

export const getUserById = async (id) => {
    const { data } = await axiosClient.get('users', {
        params: { id: id },
    });
    return data;
};

export const getUserByUsername = async (username) => {
    const { data } = await axiosClient.get('users', {
        params: { username: username },
    });
    return data[0];
};

export const checkUserLogin = async (username, password) => {
    const { data } = await axiosClient.get('users', {
        params: { username: username, password:password },
    });
    return data[0];
};

export const createUser = async (user) => {
    const res = await axiosClient.post('users', {
        ...user,
        username: user.username,
    });
    return res;
};

export const updateUser = async (id, user) => {
    const res = await axiosClient.put(`users/${id}`, {
        ...user,
        username: user.username,
    });
    return res;
};

export const deleteUser = async (id) => {
    const res = await axiosClient.delete(`users/${id}`);
    return res;
};
