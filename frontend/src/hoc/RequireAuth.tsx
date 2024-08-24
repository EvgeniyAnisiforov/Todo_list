import {FC} from 'react'
import {useLocation, Navigate} from 'react-router-dom'
import { useAppSelector } from '../redux/hook'

interface TypeProps  {
    children: React.ReactNode
}

const RequireAuth: FC<TypeProps> = ({children}) => {
    const location = useLocation()
    const authStatus = useAppSelector(state => state.setAuth.value)
    const auth = !!authStatus.id 

    if(!auth){
        return <Navigate to='/' state={{from: location}}/>
    }

    return children
}
export {RequireAuth}

