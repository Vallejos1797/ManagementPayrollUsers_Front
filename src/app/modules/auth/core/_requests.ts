import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/verify`
export const LOGIN_URL = `${API_URL}/auth/login`
export const REGISTER_URL = `${API_URL}/auth/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
    return axios.post<AuthModel>(LOGIN_URL, {
        email,
        password,
    })
}

// Server should return AuthModel
export function register(
    email: string,
    password: string,
    password_confirmation: string
) {
    return axios.post(REGISTER_URL, {
        email,
        password,
        password_confirmation,
    })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
    return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
        email,
    })
}

export function getUserByToken(token: string, id?: string) {
    return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {token, id})
}
