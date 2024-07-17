
import './resetPassword.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ToastMessage from '../../utils/toaster/toaster'
import InputField from '../../components/Common/InputField/InputField'
import { isAxiosError } from "axios";
import { resetPassword } from '../../services/Authentication/auth'

export function ResetPassword() {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const { uid, token } = useParams()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await resetPassword(
                {
                    password: password,
                    password_confirmation: passwordConfirmation
                }, uid, token
            )

            if (response.success) {
                localStorage.clear()
                ToastMessage.success(response.message)
                navigate('/login')
            }
        }
        catch (error) {
            if (isAxiosError(error)) {
                ToastMessage.error(error.response.data.message);
            } else {
                ToastMessage.error("An unexpected error occurred while resetting password");
                console.log(error);
            }
        }
    }
    return (
        <>
            {/* <div className='container '>
                <div className='row vh-100 d-flex justify-content-center align-items-center'>
                    <div className='col-4'>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className='mt-4'>
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="Enter your new password"
                                    value={password}
                                    change={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className='mt-4'>
                                <InputField
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Enter your new password confirmation"
                                    value={passwordConfirmation}
                                    change={(e) => setPasswordConfirmation(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="form-button ">
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>

            </div> */}
            <div className="row vh-100 d-flex justify-content-center align-items-center" style={{
                backgroundImage: 'url(/images/dora.webp)',
                backgroundSize: 'contain',
                backgroundPosition: 'left center ',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className="col-xl-4 col-lg-4 col-sm-8 col-8 ">
                    <div className="card" style={{ backgroundColor: '#333333', color: 'white' }}>
                        <div className="card-body">
                            <form method="post" onSubmit={handleSubmit}>
                                <div className="mt-4">
                                    <InputField
                                        type="password"
                                        name="password"
                                        placeholder="Enter your new password"
                                        value={password}
                                        change={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputField
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="Enter your new password confirmation"
                                        value={passwordConfirmation}
                                        change={(e) => setPasswordConfirmation(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="form-button mt-4">
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

