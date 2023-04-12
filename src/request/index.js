import axios from 'axios';
let service = axios.create({
    baseURL: 'http://localhost:3000/',  //baseURL自动添加在请求地址上
    timeout: 3000,
    // withCredentials: true,  //允许跨域
})

export default service



// import { startLoading, endLoading } from "@/assets/Loading.js";
// export function service(config) {
//     const instance = axios.create({
//         // baseURL: "/api",
//         // baseURL: "https://autumnfish.cn/",
//         baseURL: "http://localhost:3000",
//         // baseURL: "https://blue-music-api.vercel.app/",
//         // baseURL: "http://124.221.63.19:3000/",
//         timeout: 3000,
//         withCredentials: true,  //允许跨域
//     });

//     // 请求拦截
//     instance.interceptors.service.use(
//         config => {
//             // if (config.url != "/login/qr/check") {
//             startLoading();
//             // }
//             console.log("config:", config);
//             return config;
//         },
//         error => {
//             return Promise.reject(error);
//         }
//     );
//     // 响应拦截
//     instance.interceptors.service.use(
//         response => {
//             endLoading();
//             return response;
//         },
//         error => {
//             endLoading();
//             return Promise.reject(error);
//         }
//     );
//     instance.defaults.withCredentials = true;
//     return instance(config);
// }



