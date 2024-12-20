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

export const callDeleteUser = (id) => {
    return axios.delete(`/api/v1/users/${id}`)
}

// file upload

export const callUploadSingleFile = (file, folderType) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    bodyFormData.append('folder', folderType);

    return axios({
        method: 'post',
        url: '/api/v1/files',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

// resume

export const callFetchResume = (page, size, sort) => {
    return axios.get(`/api/v1/resumes/all?page=${page}&size=${size}&sort=${sort}`)
}

export const callFetchResumeById = (id) => {
    return axios.get(`/api/v1/resumes/${id}`)
}

export const callCreateResume = (data) => {
    return axios.post(`/api/v1/resumes`, data)
}

// schedule

export const callFetchSchedule = (page, size, sort, name) => {
    if (!name) {
        return axios.get(`/api/v1/schedules/all?page=${page}&size=${size}&sort=${sort}`)
    }
    return axios.get(`/api/v1/schedules/all?userName=${name}&page=${page}&size=${size}&sort=${sort}`)
}

export const callFetchScheduleByInviteeId = (page, size, inviteeId) => {
    return axios.get(`/api/v1/schedules/all/invitee?page=${page}&size=${size}&inviteeId=${inviteeId}`)
}

export const callCreateSchedule = (data) => {
    return axios.post(`/api/v1/schedules`, data)
}

export const callUpdateSchedule = (data) => {
    return axios.put(`/api/v1/schedules`, data)
}

export const callDeleteSchedule = (id) => {
    return axios.delete(`/api/v1/schedules/${id}`)
}


