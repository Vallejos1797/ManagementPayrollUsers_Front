import {FC} from 'react'
import {transformDate} from "../../../../../../utils/ParseInfo";

type Props = {
    check: any
}
const UserLastCheckCell: FC<Props> = ({check}) => (

    <div className='d-flex flex-column'>
        <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {check?.typeActivity.description || ''}
        </a>
        <span>            {transformDate(check?.createdAt)} </span>
        {/*<span>            {check?.createdAt} </span>*/}
    </div>
)

export {UserLastCheckCell}
