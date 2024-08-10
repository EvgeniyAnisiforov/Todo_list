import {FC} from 'react'

interface TypeProps {
    children: React.ReactNode
 }

const ModalWindow: FC<TypeProps> = ({children}) => {
    return <div className='w-[400px] h-[400px] rounded-xl bg-white'>{children}</div>
}

export default ModalWindow
