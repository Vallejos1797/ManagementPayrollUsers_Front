// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {dateToStandard} from "../../../../../../../_metronic/helpers/utils/transformadeitors";


const usersColumns: ReadonlyArray<Column<User>> = [
    {
        Header: (props) => <UserSelectionHeader tableProps={props} />,
        id: 'selection',
        Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
    },
    {
        Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]}/>,
    },
    {
        Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px'/>,
        accessor: 'role',
        Cell: ({...props}) => <span>{props.data[props.row.index]?.role?.description || 'Pending Assigned'}</span>,
    },
    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='Last login' className='min-w-125px'/>
        ),
        id: 'last_login',
        Cell: ({...props}) => <UserLastLoginCell last_login={props.data[props.row.index].last_login}/>,
    },

    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px'/>
        ),
        accessor: 'joined_day',
        Cell: ({...props}) => <span>{dateToStandard(props.data[props.row.index]?.createdAt)}</span>,

    },
    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
        ),
        id: 'actions',
        Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id}/>,
    },
]

export {usersColumns}
