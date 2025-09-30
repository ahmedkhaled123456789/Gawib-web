import axios from "axios";

export const baseURL = "https://jawib.net/api/";

const axiosRequest = axios.create({
  baseURL,
});

// ✅ Interceptor لإضافة التوكن على أي request
axiosRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor لتجديد التوكن لو منتهي
axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: any = error.config;

    // لو التوكن انتهى
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const res = await axios.post(`${baseURL}auth/user/refresh`, {
            refresh_token: refreshToken,
          });

          const newAccessToken = res.data?.data?.access?.token;
          const expiresAt = res.data?.data?.access?.expires_at;

          if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("expiresAt", expiresAt);

            // أعد إرسال الريكويست بعد تحديث التوكن
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosRequest(originalRequest);
          }
        }
      } catch (err) {
        console.error("فشل تحديث التوكن", err);
        localStorage.clear();
        window.location.href = "/login"; // رجع المستخدم لصفحة اللوجين
      }
    }

    return Promise.reject(error);
  }
);

export default axiosRequest;
