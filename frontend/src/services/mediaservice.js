
import axios from 'axios';
const baseUrl = '/api/accounts';

axios.interceptors.response.use(
    response => response,
    error => {
      return Promise.reject(error);
    }
);

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
};

const getAll = () => {
    return axios.get(baseUrl);
};

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response;
};

const update = async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response;
};

export default { getAll, create, update, setToken };
