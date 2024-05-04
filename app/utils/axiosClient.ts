import axios from "axios";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";

const axiosClient = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
});

axiosClient.defaults.headers.post["Content-Type"] = "multipart/form-data";

axiosClient.interceptors.request.use(async (AxiosRequestConfig) => {
  const session: any = await getServerSession(authOptions);
  let token;
  if (session) {
    token = session.jwt;
  }
  AxiosRequestConfig.headers.Authorization = `Bearer ${token}`;

  return AxiosRequestConfig;
});

axiosClient.interceptors.response.use(
  (AxiosResponse) => {
    return AxiosResponse;
  },
  (error) => {
    try {
      console.log(error);
    } catch (e) {
      console.error(e);
    }
    throw error;
  }
);

export default axiosClient;
