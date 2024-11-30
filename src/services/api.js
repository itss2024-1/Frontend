import axios from "../utils/axios-customize"

export const callFetchUser = () => {
    return axios.get(`/users`)
}