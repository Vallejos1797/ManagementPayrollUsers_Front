import axios, {AxiosResponse} from 'axios'
import {Role, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/management/usersLastActivity`
const ROLES_URL = `${API_URL}/management/roles`
const TYPE_CHECK_URL = `${API_URL}/management/typeActivities`




const getUsersLastCheck = (query: string): Promise<UsersQueryResponse> => {
    return axios
        .get(`${USER_URL}?${query}`)
        .then((d: AxiosResponse<UsersQueryResponse>) => {
            return d.data
        })
}
const getRoles = (query: string): Promise<Role[]> => {
    return axios
        .get(`${ROLES_URL}?${query}`)
        .then((d: AxiosResponse<Role[]>) => {
            return d.data
        })
}
const getTypeChecks = (query: string): Promise<Role[]> => {
    return axios
        .get(`${TYPE_CHECK_URL}?${query}`)
        .then((d: AxiosResponse<Role[]>) => {
            return d.data
        })
}

export {getUsersLastCheck,getRoles,getTypeChecks}
