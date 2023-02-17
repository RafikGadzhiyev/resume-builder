import { useParams } from 'react-router-dom'

export const VerificationCode = () => {
    const { user_id } = useParams();
    return <div>
        Your id {user_id}
    </div>
}