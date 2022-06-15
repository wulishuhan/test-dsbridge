import axios from "axios";

const service = axios.create({
  // timeout: 1000,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use((res) => {
  return Promise.resolve(res);
});

export default service;
