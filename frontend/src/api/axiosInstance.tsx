import axios from 'axios';

// Create an axios instance with default config
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // This is a pseudo one for my frontend testing.
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - runs before each request
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage if it exists
        const token = localStorage.getItem('authToken');

        // If token exists, add it to request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - runs after each response
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;

            // Handle 401 Unauthorized - redirect to login
            if (status === 401) {
                localStorage.removeItem('authToken');
                // You might want to redirect to login page here
                // window.location.href = '/';
                console.error('Unauthorized access. Please login again.');
            }

            // Handle 403 Forbidden
            if (status === 403) {
                console.error('You do not have permission to access this resource.');
            }

            // Handle 500 Server Error
            if (status >= 500) {
                console.error('Server error. Please try again later.');
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('Unable to connect to the server. Please check your connection.');
        } else {
            // Error in setting up the request
            console.error('Error in request setup:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;