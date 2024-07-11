
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
            <form method="post" onSubmit={handleSubmit}>
                <InputField
                    type="password"
                    name="password"
                    placeholder="Enter your new password"
                    value={password}
                    className="form-input"
                    change={(e) => setPassword(e.target.value)}
                />
                <InputField
                    type="password"
                    name="password_confirmation"
                    placeholder="Enter your new password confirmation"
                    value={passwordConfirmation}
                    className="form-input"
                    change={(e) => setPasswordConfirmation(e.target.value)}
                />

                <button type="submit" className="form-button">
                    Reset Password
                </button>
            </form>
        </>
    )
}

