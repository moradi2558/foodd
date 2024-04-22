import axios from "axios";

const apiRequests = axios.create({
  baseURL: "http://localhost:8000",
});

export default apiRequests;
