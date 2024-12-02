import axios from "../utils/axios-customize"

export const callFetchUser = (page, size, sort) => {
    return axios.get(`/api/v1/users?page=${page}&size=${size}&sort=${sort}`)
}

export const callFetchAccount = () => {
    return axios.get(`/api/v1/auth/account`)
}

export const login = (username, password) => {
    return axios.post(`/api/v1/auth/login`, {username, password})
}