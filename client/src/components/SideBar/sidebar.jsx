import './sidebar.css'
import { useNavigate } from 'react-router-dom'
import ToastMessage from '../../utils/toaster/toaster'


export function SideBar() {
    const navigate = useNavigate()
    const routeBySemester = (semester) => {
        navigate(`/semester/${semester}`)
    }
    const logoutClick = () => {
        localStorage.clear()
        ToastMessage.success("Successfully Logged Out")
        return navigate('/login')
    }

    return (
        <>
            <div className='sidebar'>
                <div>
                    <div className="cursor-pointer mt-4 mb-0 pb-0" onClick={() => navigate('/')}>Home</div>
                </div>
                <div>
                    <div onClick={() => routeBySemester('1st Semester')} className='sem-option' >1st Semester</div>
                    <div onClick={() => routeBySemester('2nd Semester')} className='sem-option' >2nd Semester</div>
                    <div onClick={() => routeBySemester('3rd Semester')} className='sem-option' >3rd Semester</div>
                    <div onClick={() => routeBySemester('4th Semester')} className='sem-option' >4th Semester</div>
                    <div onClick={() => routeBySemester('5th Semester')} className='sem-option' >5th Semester</div>
                    <div onClick={() => routeBySemester('6th Semester')} className='sem-option' >6th Semester</div>
                    <div onClick={() => routeBySemester('7th Semester')} className='sem-option' >7th Semester</div>
                    <div onClick={() => routeBySemester('8th Semester')} className='sem-option' >8th Semester</div>
                </div>

                <div onClick={logoutClick} className="cursor-pointer">
                    Logout
                </div>
            </div>
        </>
    )
}