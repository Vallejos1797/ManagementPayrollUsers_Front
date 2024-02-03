import axios, {AxiosResponse} from 'axios'
import {Role, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/management/usersLastActivity`
const ROLES_URL = `${API_URL}/management/roles`
const TYPE_CHECK_URL = `${API_URL}/management/typeActivities`
const REPORT_XLSX = `${API_URL}/management/generateActivitiesReportUsers`


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

interface ServerResponse {
    data: Blob; // Tipo del archivo que se recibe desde el servidor
}

const generateReportUsers = (filters: any): Promise<ServerResponse | void> => {
    return axios
        .post<ServerResponse>(REPORT_XLSX, filters, {
            responseType: 'blob', // Indica que esperamos un archivo como respuesta
        })
        .then((response: AxiosResponse<ServerResponse>) => {
            // Verificar que la respuesta tenga un archivo de datos
            if (response && response.data) {
                return response.data; // Devuelve el archivo de datos (Blob)
            } else {
                throw new Error('La respuesta del servidor no contiene datos.');
            }
        })
        .catch((error: any) => {
            console.error('Error en la solicitud al servidor:', error);
            throw error; // Reenvía el error para manejarlo en el frontend
        });
};

export {getUsersLastCheck, getRoles, getTypeChecks, generateReportUsers}
