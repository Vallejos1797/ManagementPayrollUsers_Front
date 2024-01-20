import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {Role, User, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/management/users`
const ROLES_URL = `${API_URL}/management/roles`
const PERSON_URL = `${API_URL}/management/persons`


const getUsers = (query: string): Promise<UsersQueryResponse> => {
    return axios
        .get(`${USER_URL}?${query}`)
        .then((d: AxiosResponse<UsersQueryResponse>) => {
            return d.data
        })
}

const getUserById = (id: ID): Promise<User | undefined> => {
    return axios
        .get(`${USER_URL}/${id}`)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data)
}

const createUser = (user: any): Promise<any | undefined> => {
    return axios
        .post(USER_URL, user)
        .then((response: AxiosResponse<Response<any>>) => response.data)
}


const updateUser = (user: User): Promise<User | undefined> => {
    return axios
        .post(`${USER_URL}/${user._id}`, user)
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


const createPerson = (person: any): Promise<any | undefined> => {
    console.log('va crear person', person)

    return axios
        .post(PERSON_URL, person)
        .then((response: AxiosResponse<Response<any>>) => {
            console.log("trajo", response)
            return response.data
        })

}

export {getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser, getRoles, createPerson}
