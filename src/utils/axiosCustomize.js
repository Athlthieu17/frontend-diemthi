import axios from "axios";
import NProgress, { trickle } from "nprogress";

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
});

const instance = axios.create({
    baseURL: 'http://103.70.12.246:8085/',

});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // getRefeshToken(store);
    // const access_token = store.getState()?.user?.account?.access_token;
    // config.headers["Authorization"] = `Bearer ${access_token}`;
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, async (error) => {
    NProgress.done();
    
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default instance;