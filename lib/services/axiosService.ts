import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

const axiosService = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
});
axiosService.defaults.headers.post["Content-Type"] = "application/json";

axiosService.interceptors.request.use(async (AxiosRequestConfig) => {
  const session: any = await getServerSession(authOptions);
  let token;
  if (session) {
    token = session.jwt;
  }
  AxiosRequestConfig.headers.Authorization = `Bearer ${token}`;
  return AxiosRequestConfig;
});
axiosService.interceptors.response.use(
  (AxiosResponse) => {
    return AxiosResponse;
  },
  (error) => {
    try {
    } catch (e) {}
    throw error;
  }
);
export default axiosService;

export const unTokenAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
