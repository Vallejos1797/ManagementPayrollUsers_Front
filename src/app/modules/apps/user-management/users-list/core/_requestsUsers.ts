import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {Person, Role, User, UsersQueryResponse,Company} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/management/users`
const ROLES_URL = `${API_URL}/management/roles`
const COMPANIES_URL = `${API_URL}/management/companies`
const PERSON_URL = `${API_URL}/management/persons`
const USER_TO_OFFICE = `${API_URL}/management/userToOffice`


const getUsers = (query: string): Promise<UsersQueryResponse> => {
    return axios
        .get(`${USER_URL}?${query}`)
        .then((d: AxiosResponse<UsersQueryResponse>) => {
            return d.data
        })
}

const getUserById = (id: ID): Promise<any | undefined> => {
    return axios
        .get(`${USER_URL}/${id}`)
        .then((response: AxiosResponse<Response<User>>) => {
            return response.data
        })
        .then((response: Response<User>) => {
            return response
        })
}

const createUser = (user: any): Promise<any | undefined> => {
    return axios
        .post(USER_URL, user)
        .then((response: AxiosResponse<Response<any>>) => response.data)
}


const updateUser = (user: User): Promise<User | undefined> => {
    return axios
        .put(`${USER_URL}/${user._id}`, user)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
    return axios.delete(`${USER_URL}/${userId}`).then(() => {
    })
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
    const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
    return axios.all(requests).then(() => {
    })
}

const getRoles = (query: string): Promise<Role[]> => {
    return axios
        .get(`${ROLES_URL}?${query}`)
        .then((d: AxiosResponse<Role[]>) => {
            return d.data
        })
}

const getCompanies = (query: string): Promise<Company[]> => {
    return axios
        .get(`${COMPANIES_URL}?${query}`)
        .then((d: AxiosResponse<Company[]>) => {
            return d.data
        })
}

const addedUserToOffice = (payload: any): Promise<any | undefined> => {
    return axios
        .post(USER_TO_OFFICE, payload)
        .then((response: AxiosResponse<Response<any>>) => response.data)
}

const updateUserToOffice = (payload: any): Promise<any | undefined> => {
    return axios
        .put(USER_TO_OFFICE, payload)
        .then((response: AxiosResponse<Response<any>>) => response.data)
}

const createPerson = (person: any): Promise<any | undefined> => {
    return axios
        .post(PERSON_URL, person)
        .then((response: AxiosResponse<Response<any>>) => {
            return response.data
        })

}

const updatePerson = (person: Person): Promise<any | undefined> => {
    return axios
        .put(`${PERSON_URL}/${person._id}`, person)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response)
}

export {
    getUsers,
    deleteUser,
    deleteSelectedUsers,
    getUserById,
    createUser,
    updateUser,
    getRoles,
    createPerson,
    updatePerson,
    getCompanies,
    addedUserToOffice,
    updateUserToOffice
}
