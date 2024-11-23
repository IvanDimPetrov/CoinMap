import axios, { AxiosError } from "axios";

let baseURL: string = import.meta.env.VITE_BACKEND_URL;

const apiInstance = axios.create({
    baseURL: `${baseURL}/api/`,
});

apiInstance.interceptors.request.use(
    config => {
        const authToken = sessionStorage.getItem('token');
        if (authToken) {
            config.headers.Authorization = `Bearer ${sessionStorage.token}`;
        }
        config.headers['access-control-allow-origin'] =  '*';
        return config;
    },
    error => {
        Promise.reject(error.response || error.message);
    }
)

apiInstance.interceptors.response.use(
    res => {
        console.log(res);
        return res;
    },
    (error: AxiosError) => {
        if (error.response?.status == 401) {
            alert("Please login!!!");
            window.location.replace('/');
        }
        Promise.reject(error);
    }
)

export default apiInstance;