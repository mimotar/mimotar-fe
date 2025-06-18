import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const axiosService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});
axiosService.defaults.headers.post["Content-Type"] = "application/json";

axiosService.interceptors.request.use(async (AxiosRequestConfig) => {
  // const session: any = await getServerSession(authOptions);
  const session = await getSession();
  const token = session?.user.accessToken;
  if (token) {
    AxiosRequestConfig.headers.Authorization = `Bearer ${token}`;
  }

  return AxiosRequestConfig;
});
axiosService.interceptors.response.use(
  (AxiosResponse) => {
    return AxiosResponse;
  },
  async (error) => {
    // const originalRequest = error.config;
    if (error.response.status === 401) {
      // Redirect to login page if unauthenticated
      toast.error("unauthenticated", { position: "top-right" });
      const data = await signOut({ redirect: false, callbackUrl: "/" });
      // useRouter().push(data.url);

      setTimeout(() => {
        window.location.href = "/";
      }, 1000); // give toast 1.5s to show

      return Promise.reject(error);
    }

    if (error.response.status === 403) {
      // Redirect to login page if unauthorized

      toast.error("session expired", { position: "top-right" });
      const data = await signOut({ redirect: false, callbackUrl: "/" });
      useRouter().push(data.url);
    }
  }
);
export default axiosService;

export const unTokenAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
