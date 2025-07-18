import axios from "axios";

export const baseURL = "https://gaweb-backend.infinityfreeapp.com/api/";
const axiosRequest = axios.create({ baseURL });

export default axiosRequest;
