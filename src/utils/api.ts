import type { AxiosRequestConfig } from "axios";
import baseUrl from "../Api/baseURL";

// GET بدون توكن
export const useGetData = async <T>(
  url: string,
  params?: AxiosRequestConfig<unknown>
): Promise<T> => {
  try {
    const res = await baseUrl.get<T>(url, params);
    return res.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

// GET مع توكن
export const useGetDataToken = async <T>(url: string): Promise<T> => {
  try {
    const res = await baseUrl.get<T>(url);
    return res.data;
  } catch (error) {
    console.error(`Error fetching data with token from ${url}:`, error);
    throw error;
  }
};

// POST
export const insertData = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await baseUrl.post<TResponse>(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`POST ${url} failed:`, error);
    throw error;
  }
};

// PUT / UPDATE
export const useInUpdateData = async <T>(
  url: string,
  data: Partial<T>,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await baseUrl.put<T>(url, data, config);
    return res.data;
  } catch (error) {
    console.error(`PUT ${url} failed:`, error);
    throw error;
  }
};

// DELETE
export const useDeleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await baseUrl.delete<T>(url, config);
    return res.data;
  } catch (error) {
    console.error(`DELETE ${url} failed:`, error);
    throw error;
  }
};
