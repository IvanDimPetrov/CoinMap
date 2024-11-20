import axios from "axios";

let baseURL: string = import.meta.env.VITE_BACKEND_URL;
const headers = {} as any;

if(sessionStorage.token) {
   headers.Authorization = `Bearer ${sessionStorage.token}`
} 
 
const apiInstance = axios.create({
    baseURL: `${baseURL}/api/`,
    headers: headers
});

export default apiInstance;