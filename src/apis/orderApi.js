import axiosClient from '../utils/axiosClient';

export const createOrderApi = async (payload) => {
    const res = await axiosClient.post('orders', { ...payload });
    return res;
};

export const getOrderByUser = async (id) => {
    const { data } = await axiosClient.get('orders', {
        params: { idUser: id, _sort: 'createAt', _order: 'desc' },
    });
    return data;
};

export const deleteOrderById = (id) => {
    return axiosClient.delete(`orders/${id}`);
};

export const updateOrder = async (id, order) => {
    const res = await axiosClient.put(`orders/${id}`, { ...order });
    return res;
};
