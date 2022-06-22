import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
        "Content-type": "application/json",
      },
})

const apiList = axios.create({
    baseURL: 'http://localhost:8081/list',
    headers: {
        "Content-type": "application/json",
      },
})

const apiPage = axios.create({
    baseURL: 'http://localhost:8081/page',
    headers: {
        "Content-type": "application/json",
      },
})

export {api, apiPage, apiList}