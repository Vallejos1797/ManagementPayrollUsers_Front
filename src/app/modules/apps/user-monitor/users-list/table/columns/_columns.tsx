// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {OfficeInfoCell} from './OfficeInfoCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserActionsCell} from './UserActionsCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {UserLastCheckCell} from "./UserLastCheckCell";


const usersColumns: ReadonlyArray<Column<User>> = [
    {
        Header: (props) => <UserSelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index]._id}/>,
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
            <UserCustomHeader tableProps={props} title='Office' className='min-w-125px'/>
        ),
        id: 'Office',
        Cell: ({...props}) => <OfficeInfoCell user={props.data[props.row.index]}/>,
    },

    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='Last Check' className='min-w-125px'/>
        ),
        accessor: 'joined_day',
        Cell: ({...props}) => <UserLastCheckCell check={props.data[props.row.index].lastActivity || null}/>,

    },
    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
        ),
        id: 'actions',
        Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index]._id}/>,
    },
]

export {usersColumns}
