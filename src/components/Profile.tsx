import { useSelector } from 'react-redux'
import { RootState } from '../state/store'

export const Profile = () => {
    const user = useSelector((store: RootState) => store.authReducer.user)

    return <div>
        Welcome, {user?.full_name}
    </div>
}

// ! GIT PUSH -U MAIN 
