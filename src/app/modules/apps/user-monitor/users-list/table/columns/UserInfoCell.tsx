/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {User} from '../../core/_models'

type Props = {
    user: User
}

const UserInfoCell: FC<Props> = ({user}) => (

    <div className='d-flex align-items-center'>
        {/* begin:: Avatar */}
        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
            {user.avatar}

            <a href='#'>
                <div className='symbol-label'>
                    <img src="/media/avatars/blank.png" alt="Emma Smith" className="w-100"/>
                </div>

            </a>
        </div>
        <div className='d-flex flex-column'>
            <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                {user?.person?.firstName} {user?.person?.lastName}
            </a>
            <span>{user.person.identity}</span>
        </div>
    </div>
)

export {UserInfoCell}
