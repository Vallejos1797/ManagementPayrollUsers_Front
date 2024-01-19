import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  username?: string
  avatar?: string
  email?: string
  position?: string
  role?: any
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
  _id: string;
  description?: string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
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
