import {ID, Response} from '../../../../../../_metronic/helpers'

export type User = {
    _id?: ID
    username?: string
    email?: string
    password?: string
    person?: any
    role?: any
    company?: any
    department?: any
    office?: any
    // Person information

    firstName?: string
    lastName?: string
    identity?: string
    phone?: string
    direction?: string
    birthday?: string

    // complement attributes
    avatar?: string
    position?: string
    last_login?: string
    two_steps?: boolean
    joined_day?: string
    online?: boolean
    initials?: {
        label: string
        state: string
    }
}

export type Role = {
    _id?: string;
    description?: string;
    permissions?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export type Company = {
    _id?: string;
    description?: string;
    departments?: any;
    createdAt?: string;
}

export type Department = {
    _id?: string;
    description?: string;
    offices?: any;
    createdAt?: string;
}

export type Office = {
    _id?: string;
    description?: string;
    createdAt?: string;
}

export type Person = {
    _id?: string;
    firstName?: string
    lastName?: string
    identity?: string
    phone?: string
    direction?: string
    birthday?: string
}


export type UsersQueryResponse = Response<Array<User>>
export type RolesQueryResponse = Response<Array<Role>>

export const initialUser: User = {
    avatar: 'avatars/300-6.jpg',
    position: 'Art Director',
    role: 'Administrator',
    username: '',
    email: '',
}
