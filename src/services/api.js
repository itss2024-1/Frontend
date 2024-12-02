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

export const callCreateUser = (data) => {
    return axios.post(`/api/v1/users`, data)
}   

export const callUpdateUser = (data) => {
    return axios.put(`/api/v1/users`, data)
}

export const callDeleteUser = (data) => {
    return axios.delete(`/api/v1/users`, data)
}

// school

export const callFetchSchool = (page, size, sort) => {
    return axios.get(`/api/v1/schools?page=${page}&size=${size}&sort=${sort}`)
}

export const callCreateSchool = (data) => {
    return axios.post(`/api/v1/schools`, data)
}

export const callUpdateSchool = (data) => {
    return axios.put(`/api/v1/schools`, data)
}

export const callDeleteSchool = (data) => {
    return axios.delete(`/api/v1/schools`, data)
}