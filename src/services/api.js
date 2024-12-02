import axios from "../utils/axios-customize"

// auth
export const callFetchAccount = () => {
    return axios.get(`/api/v1/auth/account`)
}

export const login = (username, password) => {
    return axios.post(`/api/v1/auth/login`, {username, password})
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}

// user
export const callFetchUser = (page, size, sort) => {
    return axios.get(`/api/v1/users?page=${page}&size=${size}&sort=${sort}`)
}

// school

export const callFetchSchool = (page, size, sort) => {
    return axios.get(`/api/v1/schools?page=${page}&size=${size}&sort=${sort}`)
}