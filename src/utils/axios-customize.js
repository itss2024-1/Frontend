import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

// Tạo một instance của axios
const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: false, // Không sử dụng cookie hoặc thông tin xác thực
});

const NO_RETRY_HEADER = 'x-no-retry'

instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` }

// Thêm request interceptor (nếu cần, có thể không thêm)
instance.interceptors.request.use(
    (config) => {
        // Không thêm bất kỳ header hoặc logic liên quan đến security
        return config; // Trả về config không thay đổi
    },
    (error) => {
        return Promise.reject(error); // Trả về lỗi nếu có vấn đề trong config
    }
);

// Thêm response interceptor
instance.interceptors.response.use(
    (response) => {
        // Trả về dữ liệu từ response (giữ nguyên không thay đổi)
        return response;
    },
    (error) => {
        // Xử lý lỗi nếu có
        return Promise.reject(error); // Trả về lỗi
    }
);

export default instance;
