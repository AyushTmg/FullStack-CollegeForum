import { Link, useNavigate } from 'react-router-dom';
import ToastMessage from '../../utils/toaster/toaster';


export default function Home() {
    const navigate = useNavigate()

    // ! For Handeling User Logout
    const logoutClick = () => {
        localStorage.clear()
        ToastMessage.success("Successfully Logged Out")
        return navigate('/login')
    }

    return (
        <>
            <div>Home</div>

            {/*For User Logout */}
            <button onClick={logoutClick}>Logout</button>
            <button><Link to={'/change-password'}>Change Password</Link></button>
        </>
    )
}