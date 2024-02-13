import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Company, Department, initialUser, Office, Person, Role, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import
{
    createUser,
    getRoles,
    createPerson,
    updateUser,
    updatePerson,
    getCompanies,
    addedUserToOffice,
    updateUserToOffice
}
    from '../core/_requestsUsers'
import {useQueryResponse} from '../core/QueryResponseProvider'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

type Props = {
    isUserLoading: boolean
    user: User
}

const userSchema = (user) => {
    return  Yup.object().shape({
        username: Yup.string()
            .min(6, 'Minimum 6 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Name is required'),
        email: Yup.string()
            .email('Wrong email format')
            .min(6, 'Minimum 6 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Email is required'),
        password:
            user
                ? Yup.string()
                    .min(8, 'Minimum 3 symbols')
                    .max(50, 'Maximum 50 symbols')
                : Yup.string()
                    .min(8, 'Minimum 3 symbols')
                    .max(50, 'Maximum 50 symbols')
                    .required('Password is required'),
        firstName: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols'),
        lastName: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols'),
        identity: Yup.string()
            .min(10, 'Minimum 10 symbols')
            .max(50, 'Maximum 50 symbols'),
        phone: Yup.string()
            .min(10, 'Minimum 10 symbols')
            .max(50, 'Maximum 50 symbols'),
        direction: Yup.string()
            .min(10, 'Minimum 10 symbols')
            .max(50, 'Maximum 50 symbols'),
        role: Yup.string()
            .required('Role is required'),
    });
};
const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
    const {setItemIdForUpdate} = useListView()
    const {refetch} = useQueryResponse()
    const [roles, setRoles] = useState<Role[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [showDepartmentsSelect, setShowDepartmentsSelect] = useState(false);
    const [offices, setOffices] = useState<Office[]>([]);
    const [showOfficesSelect, setShowOfficesSelect] = useState(false);
    const [userForEdit, setFormEdit] = useState<User>({
        ...user,
        username: user.username || "",
        email: user.email || "",
        password: '',
        role: user.role ? user.role._id : "",
        company: user.company ? user?.company._id : "",
        department: user.department ? user.department._id : "",
        office: user.office ? user.office._id : "",

        // Person information
        firstName: user.person ? user.person.firstName : "",
        lastName: user.person ? user.person.lastName : "",
        identity: user.person ? user.person.identity : "",
        phone: user.person ? user.person.phone : "",
        direction: user.person ? user.person.direction : "",
        birthday: user.person ? user.person.birthday : new Date().toDateString(),


        // complement attributes
        avatar: user.avatar || initialUser.avatar,
        position: user.position || initialUser.position,
    })

    useEffect(() => {
        getRoles("").then((response: Role[]) => {
            setRoles(response); // Almacena el rol en un array para el estado
        });
    }, []);

    useEffect(() => {
        getCompanies("").then((response: Role[]) => {
            setCompanies(response);

        });
    }, []);
    useEffect(() => {
        if (user?.company._id && companies.length > 0) {
            handleCompanyChange(user?.company._id)
        }

    }, [companies])
    useEffect(() => {
        if (user?.department._id) {
            handleDepartmentChange(user?.department._id)
        }
    }, [departments])


    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }
    const transformDate = (date: string) => {
        return new Date(date).toISOString()
    }

    const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
    const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.avatar}`)

    const formik = useFormik({
        initialValues: userForEdit,
        validationSchema: userSchema(user),
        onSubmit: async (values, {setSubmitting}) => {
            console.log('llega-->', values)
            const person: Person = {
                firstName: values.firstName,
                lastName: values.lastName,
                identity: values.identity,
                phone: values.phone,
                direction: values.direction,
                birthday: transformDate(values.birthday || ""),
            }
            let user: any = {
                username: values.username,
                email: values.email,
                password: values.password,
                roleId: values.role,
            }
            setSubmitting(true)
            try {
                // Update
                if (isNotEmpty(values._id)) {
                    person._id = userForEdit.person._id
                    await updatePerson(person).then(() => {
                    })

                    await updateUser(values).then(() => {
                    })
                    await updateUserToOffice({
                        idUser: values._id,
                        idOffice: values.office
                    }).then(() => {
                    })
                }
                // Create User
                else {
                    await createPerson(person).then(data => {
                        user.personId = data._id
                    })
                    await createUser(user).then((newUser) => {
                        user = {...user, ...newUser}
                    })
                    await addedUserToOffice({
                        idUser: user.id,
                        idOffice: values.office
                    }).then((office) => {
                        console.log('funciono', office)
                    })

                }
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(true)
                cancel(true)
            }
        },
    })


    const handleCompanyChange = (companyId: string) => {
        const company = companies.find(company => companyId == company._id)
        console.log('companies', companies)
        console.log('encontro departments', company?.departments)
        setDepartments(company?.departments)
        companyId ? setShowDepartmentsSelect(true) : setShowDepartmentsSelect(false)
    };

    const handleDepartmentChange = (departmentId: string) => {
        const department = departments.find(department => departmentId == department._id)
        console.log('departments', departments)

        console.log('encontro offices', department?.offices)
        setOffices(department?.offices)
        departmentId ? setShowOfficesSelect(true) : setShowOfficesSelect(false)
    };


    return (
        <>
            <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
                {/* begin::Scroll */}
                <div
                    className='d-flex flex-column scroll-y me-n7 pe-7'
                    id='kt_modal_add_user_scroll'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-max-height='auto'
                    data-kt-scroll-dependencies='#kt_modal_add_user_header'
                    data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                    data-kt-scroll-offset='300px'
                >
                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className='d-block fw-bold fs-6 mb-5'>Avatar</label>
                        {/* end::Label */}

                        {/* begin::Image input */}
                        <div
                            className='image-input image-input-outline'
                            data-kt-image-input='true'
                            style={{backgroundImage: `url('${blankImg}')`}}
                        >
                            {/* begin::Preview existing avatar */}
                            <div
                                className='image-input-wrapper w-125px h-125px'
                                style={{backgroundImage: `url('${userAvatarImg}')`}}
                            ></div>
                            {/* end::Preview existing avatar */}

                            {/* begin::Label */}
                            {/* <label
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='change'
              data-bs-toggle='tooltip'
              title='Change avatar'
            >
              <i className='bi bi-pencil-fill fs-7'></i>

              <input type='file' name='avatar' accept='.png, .jpg, .jpeg' />
              <input type='hidden' name='avatar_remove' />
            </label> */}
                            {/* end::Label */}

                            {/* begin::Cancel */}
                            {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='cancel'
              data-bs-toggle='tooltip'
              title='Cancel avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
                            {/* end::Cancel */}

                            {/* begin::Remove */}
                            {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
                            {/* end::Remove */}
                        </div>
                        {/* end::Image input */}

                        {/* begin::Hint */}
                        {/* <div className='form-text'>Allowed file types: png, jpg, jpeg.</div> */}
                        {/* end::Hint */}
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className='required fw-bold fs-6 mb-2'>User Name</label>
                        {/* end::Label */}

                        {/* begin::Input */}
                        <input
                            placeholder='User Name'
                            {...formik.getFieldProps('username')}
                            type='text'
                            name='username'
                            className={clsx(
                                'form-control form-control-solid mb-3 mb-lg-0',
                                {'is-invalid': formik.touched.username && formik.errors.username},
                                {
                                    'is-valid': formik.touched.username && !formik.errors.username,
                                }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.username}</span>
                                </div>
                            </div>
                        )}
                        {/* end::Input */}
                    </div>
                    {/* end::Input group */}


                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className='required fw-bold fs-6 mb-2'>Email</label>
                        {/* end::Label */}

                        {/* begin::Input */}
                        <input
                            placeholder='Email'
                            {...formik.getFieldProps('email')}
                            className={clsx(
                                'form-control form-control-solid mb-3 mb-lg-0',
                                {'is-invalid': formik.touched.email && formik.errors.email},
                                {
                                    'is-valid': formik.touched.email && !formik.errors.email,
                                }
                            )}
                            type='email'
                            name='email'
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                        />
                        {/* end::Input */}
                        {formik.touched.email && formik.errors.email && (

                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.email}</span>
                                </div>
                            </div>
                        )}

                    </div>
                    {/* end::Input group */}
                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className='required fw-bold fs-6 mb-2'>Password</label>
                        {/* end::Label */}

                        {/* begin::Input */}
                        <input
                            type='password'
                            autoComplete='off'
                            placeholder='Password'
                            {...formik.getFieldProps('password')}
                            className={clsx(
                                'form-control form-control-solid mb-3 mb-lg-0',
                                {'is-invalid': formik.touched.password && formik.errors.password},
                                {
                                    'is-valid': formik.touched.password && !formik.errors.password,
                                }
                            )}
                            name='password'
                            disabled={formik.isSubmitting || isUserLoading}
                        />
                        {/* end::Input */}
                        {formik.touched.password && formik.errors.password && (

                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.password}</span>
                                </div>
                            </div>
                        )}

                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className=' fw-bold fs-6 mb-2'>First Name</label>
                        {/* end::Label */}

                        {/* begin::Input */}
                        <input
                            placeholder='First Name'
                            {...formik.getFieldProps('firstName')}
                            type='text'
                            name='firstName'
                            className={clsx(
                                'form-control form-control-solid mb-3 mb-lg-0',
                                {'is-invalid': formik.touched.firstName && formik.errors.firstName},
                                {
                                    'is-valid': formik.touched.firstName && !formik.errors.firstName,
                                }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.firstName}</span>
                                </div>
                            </div>
                        )}
                        {/* end::Input */}
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className=' fw-bold fs-6 mb-2'>Last Name</label>
                        {/* end::Label */}

                        {/* begin::Input */}
                        <input
                            placeholder='Last Name'
                            {...formik.getFieldProps('lastName')}
                            type='text'
                            name='lastName'
                            className={clsx(
                                'form-control form-control-solid mb-3 mb-lg-0',
                                {'is-invalid': formik.touched.lastName && formik.errors.lastName},
                                {
                                    'is-valid': formik.touched.lastName && !formik.errors.lastName,
                                }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.lastName}</span>
                                </div>
                            </div>
                        )}
                        {/* end::Input */}
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className=' fw-bold fs-6 mb-2'>Identity</label>
                        {/* end::Label */}

                        {/* begin::Input */}
                        <input
                            placeholder='Identity'
                            {...formik.getFieldProps('identity')}
                            type='text'
                            name='identity'
                            className={clsx(
                                'form-control form-control-solid mb-3 mb-lg-0',
                                {'is-invalid': formik.touched.identity && formik.errors.identity},
                                {
                                    'is-valid': formik.touched.identity && !formik.errors.identity,
                                }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                        />
                        {formik.touched.identity && formik.errors.identity && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.identity}</span>
                                </div>
                            </div>
                        )}
                        {/* end::Input */}
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className=' fw-bold fs-6 mb-2'>Phone</label>
                        {/* end::Label */}

                        {/* begin::Input */}
                        <input
                            placeholder='Phone'
                            {...formik.getFieldProps('phone')}
                            type='text'
                            name='phone'
                            className={clsx(
                                'form-control form-control-solid mb-3 mb-lg-0',
                                {'is-invalid': formik.touched.phone && formik.errors.phone},
                                {
                                    'is-valid': formik.touched.phone && !formik.errors.phone,
                                }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.phone}</span>
                                </div>
                            </div>
                        )}
                        {/* end::Input */}
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className=' fw-bold fs-6 mb-2'>Direction</label>
                        {/* end::Label */}

                        {/* begin::Input */}
                        <input
                            placeholder='Direction'
                            {...formik.getFieldProps('direction')}
                            type='text'
                            name='direction'
                            className={clsx(
                                'form-control form-control-solid mb-3 mb-lg-0',
                                {'is-invalid': formik.touched.direction && formik.errors.direction},
                                {
                                    'is-valid': formik.touched.direction && !formik.errors.direction,
                                }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                        />
                        {formik.touched.direction && formik.errors.direction && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.direction}</span>
                                </div>
                            </div>
                        )}
                        {/* end::Input */}
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className=' fw-bold fs-6 mb-2'>Birthday</label>
                        {/* end::Label */}

                        {/* begin::Flatpickr */}
                        <Flatpickr
                            placeholder='Birthday'
                            value={userForEdit.birthday}
                            onChange={([date]) => {
                                setFormEdit(prevUser => ({
                                    ...prevUser,
                                    person: {
                                        ...prevUser.person,
                                        birthday: date.toDateString(),
                                    },
                                }))
                            }}
                            name='birthday'
                            className='form-control form-control-solid mb-3 mb-lg-0'
                            autoComplete='off'
                            options={{
                                dateFormat: 'Y-m-d', // Ajusta el formato de fecha según tus necesidades
                                enable: [
                                    {
                                        from: '1900-01-01', // Puedes ajustar el rango según tus necesidades
                                        to: '2050-12-31', // Puedes ajustar el rango según tus necesidades
                                    },
                                ],
                            }}
                            disabled={formik.isSubmitting || isUserLoading}
                        />
                        {/* end::Flatpickr */}

                        {formik.touched.birthday && formik.errors.birthday && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.birthday}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='mb-7'>
                        {/* begin::Label */}
                        <label className='required fw-bold fs-6 mb-5'>Role</label>

                        {/* end::Label */}
                        {/* begin::Input row */}
                        {roles.length > 0 && (

                            roles.map((role) => (
                                <div className='d-flex fv-row mt-5' key={'div-' + role._id}>
                                    {/* begin::Radio */}
                                    <div className='form-check form-check-custom form-check-solid'>
                                        {/* begin::Input */}
                                        <input
                                            key={role._id}
                                            className='form-check-input me-3'
                                            {...formik.getFieldProps('role')}
                                            name='role'
                                            type='radio'
                                            id={'kt_modal_update_role_option_' + role._id}
                                            value={role._id}  // Asignar el valor del rol al input
                                            checked={formik.values.role === role._id}
                                            disabled={formik.isSubmitting || isUserLoading}
                                        />
                                        {/* end::Input */}
                                        {/* begin::Label */}
                                        <label className='form-check-label'
                                               htmlFor={'kt_modal_update_role_option_' + role._id}>
                                            <div className='fw-bolder text-gray-800'>{role.description}</div>
                                            <div className='text-gray-600'>
                                                View Permission
                                            </div>
                                        </label>
                                        {/* end::Label */}
                                    </div>
                                    {/* end::Radio */}
                                </div>
                            ))

                        )}
                        {/* end::Input row */}
                    </div>
                    {/* end::Input group */}


                    <div className='fv-row mb-7'>
                        {/* begin::Label */}
                        <label className=' fw-bold fs-6 mb-2'>Company</label>
                        {/* end::Label */}
                        <select
                            {...formik.getFieldProps('company')}

                            name='company'
                            data-control='select2'
                            onChange={(e) => {
                                formik.handleChange(e);
                                handleCompanyChange(e.target.value);
                            }}
                            className='form-select form-select-sm form-select-solid'
                        >
                            <option value=''>Select</option>
                            {companies.length > 0 && (
                                companies.map((company) => (
                                    <option key={company._id} value={company._id}>{company.description}</option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className='fv-row mb-7'>
                        {showDepartmentsSelect && departments && (
                            <div>
                                <label className=' fw-bold fs-6 mb-2'>Department</label>
                                <select
                                    {...formik.getFieldProps('department')}
                                    name='department'
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        handleDepartmentChange(e.target.value);
                                    }}
                                    className='form-select form-select-sm form-select-solid'
                                >
                                    <option value=''>Select department</option>
                                    {departments.map((department) => (
                                        <option key={department._id} value={department._id}>
                                            {department.description}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        )}
                    </div>
                    <div className='fv-row mb-7'>
                        {showOfficesSelect && offices && (
                            <div>
                                <label className=' fw-bold fs-6 mb-2'>Office</label>
                                <select
                                    {...formik.getFieldProps('office')}
                                    name='office'
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    className='form-select form-select-sm form-select-solid'
                                >
                                    <option value=''>Select office</option>
                                    {offices.map((office) => (
                                        <option key={office._id} value={office._id}>
                                            {office.description}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        )}
                    </div>


                    {/* end::Input */}

                </div>
                {/* end::Scroll */}

                {/* begin::Actions */}
                <div className='text-center pt-15'>
                    <button
                        type='reset'
                        onClick={() => cancel()}
                        className='btn btn-light me-3'
                        data-kt-users-modal-action='cancel'
                        disabled={formik.isSubmitting || isUserLoading}
                    >
                        Discard
                    </button>

                    <button
                        type='submit'
                        className='btn btn-primary'
                        data-kt-users-modal-action='submit'
                        disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
                    >
                        <span className='indicator-label'>Submit</span>
                        {(formik.isSubmitting || isUserLoading) && (
                            <span className='indicator-progress'>
                Please wait...{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
                        )}
                    </button>
                </div>
                {/* end::Actions */}
            </form>
            {(formik.isSubmitting || isUserLoading) && <UsersListLoading/>}
        </>
    )
}

export {UserEditModalForm}
