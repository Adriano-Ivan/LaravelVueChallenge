import axios from "axios";
import getCurrentUser from "./getCurrentUser";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    let currentUser = await getCurrentUser();
    let token = await currentUser.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
