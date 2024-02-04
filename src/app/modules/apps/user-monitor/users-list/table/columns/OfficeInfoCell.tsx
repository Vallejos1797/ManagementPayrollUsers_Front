/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {User} from '../../core/_models'
import {KTIcon} from "../../../../../../../_metronic/helpers";

type Props = {
    user: User
}

const OfficeInfoCell: FC<Props> = ({user}) => (

    <div className='d-flex align-items-center'>
        {/* begin:: Avatar */}
        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
            {user.avatar}

            <a href='#'>
                <KTIcon iconName='pointers' className='fs-2 text-gray-500' />

            </a>
        </div>
        <div className='d-flex flex-column'>
            <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                {user?.company}
            </a>
            <span>{user.department} - {user.office} </span>
        </div>
    </div>
)

export {OfficeInfoCell}
