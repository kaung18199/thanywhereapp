import axios from "axios";

// Set the default base URL for Axios

const baseURL = "https://api-blog.thanywhere.com/api/v2/";

axios.defaults.baseURL = baseURL;

export default axios;
