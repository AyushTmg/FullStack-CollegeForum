import './changePassword.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ToastMessage from '../../utils/toaster/toaster'
import InputField from '../../components/Common/InputField/InputField'
import { isAxiosError } from "axios";
import { changePassword } from '../../services/Authentication/auth'

export function ChangePassword() {
    const navigate = useNavigate()
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")
    // const [errorResponse, setError] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await changePassword(
                {
                    old_password: oldPassword,
                    new_password: newPassword,
                    new_password_confirmation: newPasswordConfirmation
                }
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
                // ! Doing It later
                // const errors = error.response.data.errors
                // if (error != null) {
                //     setError(errors)
                // }
            } else {
                ToastMessage.error("An unexpected error occurred.", error);
            }
        }
    }

    return (
        <>

            <div className='row d-flex justify-content-center align-items-center vh-100' style={{
                backgroundImage: 'url(/images/broom.webp),url(/images/broom.webp)',
                backgroundSize: 'contain',
                backgroundPosition: 'left center, right center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className='col-lg-6 col-xl-4 col-md-6 col-sm-6 card p-4 ' style={{ backgroundColor: '#333333' }}>
                    <form method="post" onSubmit={handleSubmit}>
                        <div className='mb-2'>
                            <InputField
                                type="password"
                                name="old_password"
                                placeholder="Enter your old password"
                                value={oldPassword}
                                className="form-input"
                                change={(e) => setOldPassword(e.target.value)}
                            // error={errorResponse.old_password ? errorResponse.old_password : null}
                            />
                        </div>
                        <div className='mb-2'>
                            <InputField
                                type="password"
                                name="new_password"
                                placeholder="Enter your new password"
                                value={newPassword}
                                className="form-input"
                                change={(e) => setNewPassword(e.target.value)}
                            // error={errorResponse.new_password ? errorResponse.new_password : null}
                            />
                        </div>

                        <div className='mb-2'>
                            <InputField
                                type="password"
                                name="new_password_confirmation"
                                placeholder="Enter your new password confirmation"
                                value={newPasswordConfirmation}
                                className="form-input"
                                change={(e) => setNewPasswordConfirmation(e.target.value)}
                            // error={errorResponse.new_password_confirmation ? errorResponse.new_password_confirmation : null}
                            />
                        </div>


                        <button type="submit" className="form-button">
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
