import {FC} from 'react'
import {useLocation, Navigate} from 'react-router-dom'

interface TypeProps  {
    children: React.ReactNode
}

const RequireAuth: FC<TypeProps> = ({children}) => {
    const location = useLocation()
    const auth = false // потом сделаю лучше

    if(!auth){
        return <Navigate to='/' state={{from: location}}/>
    }

    return children
}
export {RequireAuth}