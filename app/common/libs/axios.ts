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
/*
apiList.interceptors.request.use(request => {
  console.log(`Request [${request.method}]: ${request.baseURL}${request.url} | params - ${JSON.stringify(request.params)}`)
  return request
})

apiList.interceptors.response.use(response => {
  console.log(`Response [${response.config.method}]: ${response.status} | ${response.config.baseURL}${response.config.url} | data - ${JSON.stringify(response.data)}`)
  return response
})
*/
export { api, apiPage, apiList };
