import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BE_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (param) => queryString.stringify(param, { arrayFormat: 'repeat' }),
});

export default axiosClient;
