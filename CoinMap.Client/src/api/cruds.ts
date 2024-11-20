import apiInstance from "./apiInstance"

export async function GetRequest<T>(url: string, params?: {}) : Promise<T> {
    const res = await apiInstance.get(url, { params: params });

    return res.data as T;
}

export async function PostReguest<T>(url: string, params?: {}): Promise<T> {
    const res = await apiInstance.post(url, params);

    return res.data as T;
}