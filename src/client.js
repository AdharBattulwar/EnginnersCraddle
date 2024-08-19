import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://intern-task-api.bravo68web.workers.dev/api/',
    timeout: 1000,
    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
  });

  export default axiosInstance