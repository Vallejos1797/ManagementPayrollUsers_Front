/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Administrator</span>
        </div>
      </div>





      <AsideMenuItem to='/apps/user-management/users' icon='shield-tick' title='User management' />

    </>
  )
}
