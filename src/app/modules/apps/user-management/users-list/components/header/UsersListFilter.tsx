import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {getRoles} from "../../core/_requestsUsers";
import {Role} from "../../core/_models";

const UsersListFilter = () => {
    const {updateState} = useQueryRequest()
    const {isLoading} = useQueryResponse()
    const [role, setRole] = useState<string | undefined>()
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        getRoles("").then((response: Role[]) => {
            console.log('llega', response);
            setRoles(response); // Almacena el rol en un array para el estado
        });
    }, []);

    useEffect(() => {
        MenuComponent.reinitialization()
    }, [])

    const resetData = () => {
        updateState({filter: undefined, ...initialQueryState})
    }

    const filterData = () => {
        updateState({
            filter: {role},
            ...initialQueryState,
        })
    }

    return (
        <>
            {/* begin::Filter Button */}
            <button
                disabled={isLoading}
                type='button'
                className='btn btn-light-primary me-3'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
            >
                <KTIcon iconName='filter' className='fs-2'/>
                Filter
            </button>
            {/* end::Filter Button */}
            {/* begin::SubMenu */}
            <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
                {/* begin::Header */}
                <div className='px-7 py-5'>
                    <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
                </div>
                {/* end::Header */}

                {/* begin::Separator */}
                <div className='separator border-gray-200'></div>
                {/* end::Separator */}

                {/* begin::Content */}
                <div className='px-7 py-5' data-kt-user-table-filter='form'>
                    {/* begin::Input group */}
                    <div>
                        {roles.length > 0 && (
                            <div className='mb-10'>
                                <label className='form-label fs-6 fw-bold'>Role:</label>
                                <select
                                    className='form-select form-select-solid fw-bolder'
                                    data-kt-select2='true'
                                    data-placeholder='Select option'
                                    data-allow-clear='true'
                                    data-kt-user-table-filter='role'
                                    data-hide-search='true'
                                    onChange={(e) => setRole(e.target.value)}
                                    value={role}
                                >
                                    <option value=''></option>
                                    {roles.map((role) => (
                                        <option key={role._id} value={role._id}>
                                            {role.description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    {/* end::Input group */}


                    {/* begin::Actions */}
                    <div className='d-flex justify-content-end'>
                        <button
                            type='button'
                            disabled={isLoading}
                            onClick={filterData}
                            className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
                            data-kt-menu-dismiss='true'
                            data-kt-user-table-filter='reset'
                        >
                            Reset
                        </button>
                        <button
                            disabled={isLoading}
                            type='button'
                            onClick={resetData}
                            className='btn btn-primary fw-bold px-6'
                            data-kt-menu-dismiss='true'
                            data-kt-user-table-filter='filter'
                        >
                            Apply
                        </button>
                    </div>
                    {/* end::Actions */}
                </div>
                {/* end::Content */}
            </div>
            {/* end::SubMenu */}
        </>
    )
}

export {UsersListFilter}
