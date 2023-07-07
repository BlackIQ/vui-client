import axios from "axios";

import { apiConfig } from "@/config";

const API = axios.create({
  baseURL: apiConfig.endpoint,
  headers: {
    apiKey: apiConfig.authKey,
  },
});

export default API;
