/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useLayout} from '../core'

const Footer: FC = () => {
  const {classes} = useLayout()
  return (
    <div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
      {/* begin::Container */}
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-center`}
      >
        {/* begin::Copyright */}
          <div className='text-center d-flex justify-content-center'>
              <a href='#' className='text-gray-800 text-hover-primary'>
                  BlueDemon Technology
              </a>
              <span className='text-muted fw-bold ms-2'>{new Date().getFullYear()} &copy;</span>
          </div>
        {/* end::Copyright */}

        {/* begin::Nav */}

        {/* end::Nav */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Footer}
