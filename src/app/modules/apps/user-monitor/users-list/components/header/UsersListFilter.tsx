import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {getRoles, getTypeChecks} from "../../core/_requestsUsers";
import {Role, TypeActivity} from "../../core/_models";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
// Función para obtener el primer día del mes actual
const getFirstDayOfMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
};

// Función para obtener el último día del mes actual
const getLastDayOfMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0);
};
const UsersListFilter = () => {
    const [dateRange, setDateRange] = useState([getFirstDayOfMonth(), getLastDayOfMonth()]);
    const [startDate, endDate] = dateRange;
       const {updateState} = useQueryRequest()
    const {isLoading} = useQueryResponse()
    const [role, setRole] = useState<string | undefined>()
    const [roles, setRoles] = useState<Role[]>([]);
    const [typeCheck, setTypeCheck] = useState<string | undefined>()
    const [typeChecks, setTypeChecks] = useState<Role[]>([]);

    useEffect(() => {
        getRoles("").then((response: Role[]) => {
            setRoles(response); // Almacena el rol en un array para el estado
        });
        getTypeChecks("").then((response: TypeActivity[]) => {
            setTypeChecks(response);
        });
    }, []);

    useEffect(() => {
        MenuComponent.reinitialization()
    }, [])

    const resetData = () => {
        updateState({filter: undefined, ...initialQueryState})
    }
    useEffect(() => {
        filterData()
    }, [dateRange]);



    const filterData = () => {
        const formattedStartDate =new Date(dateRange[0]);
        const formattedEndDate = new Date(dateRange[1]);
        const isoFormattedEndDate = formattedEndDate.toISOString();
        const isoFormattedStartDate = formattedStartDate.toISOString();
        updateState({
            filter: {role, typeCheck, endDate: isoFormattedEndDate, startDate: isoFormattedStartDate},
            ...initialQueryState,
        });
    }


    return (
        <>
            <div className='m-2'>
                <DatePicker
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    placeholderText="Selected date"
                    isClearable={true}
                    className='form-control'
                    dateFormat="dd/MM/yyyy"
                    yearDropdownItemNumber={15}
                    selectsRange={true}
                    showYearDropdown
                    scrollableYearDropdown
                />
            </div>
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
                    {/* begin::Input group */}
                    <div>
                        {typeChecks.length > 0 && (
                            <div className='mb-10'>
                                <label className='form-label fs-6 fw-bold'>Type Check:</label>
                                <select
                                    className='form-select form-select-solid fw-bolder'
                                    data-kt-select2='true'
                                    data-placeholder='Select option'
                                    data-allow-clear='true'
                                    data-kt-user-table-filter='typeCheck'
                                    data-hide-search='true'
                                    onChange={(e) => setTypeCheck(e.target.value)}
                                    value={typeCheck}
                                    multiple={false}
                                >
                                    <option value=''></option>
                                    {typeChecks.map((typeCheck) => (
                                        <option key={typeCheck._id} value={typeCheck._id}>
                                            {typeCheck.description}
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
                            onClick={resetData}
                            className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
                            data-kt-menu-dismiss='true'
                            data-kt-user-table-filter='reset'
                        >
                            Reset
                        </button>
                        <button
                            disabled={isLoading}
                            type='button'
                            onClick={filterData}
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
