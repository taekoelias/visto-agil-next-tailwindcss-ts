import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const api = axios.create({
    baseURL: publicRuntimeConfig.backendUrl,
    headers: {
        "Content-type": "application/json",
      },
})

const apiList = axios.create({
    baseURL: `${publicRuntimeConfig.backendUrl}/list`,
    headers: {
        "Content-type": "application/json",
      },
})

const apiPage = axios.create({
    baseURL: `${publicRuntimeConfig.backendUrl}/page`,
    headers: {
        "Content-type": "application/json",
      },
})

export { api, apiPage, apiList };
