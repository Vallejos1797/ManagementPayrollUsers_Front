import {useListView} from '../../core/ListViewProvider'

const UsersListGrouping = () => {
  const {selected} = useListView()



  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>


    </div>
  )
}

export {UsersListGrouping}
