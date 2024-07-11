import { useState } from "react"
import "./login.css"
import { useNavigate } from "react-router-dom"
import InputField from "../../components/Common/InputField/InputField"
import { Link } from 'react-router-dom';
import ToastMessage from "../../utils/toaster/toaster"
import { userLogin } from "../../services/Authentication/auth"
import { isAxiosError } from "axios"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userLogin({ email, password })
            if (response.success) {
                ToastMessage.success(response.message)
                // ! Navigating To Root
                navigate('/')
            }

            // ! If Response Has Succes To False Navigating To Login
        } catch (error) {
            if (isAxiosError(error)) {
                ToastMessage.error("Invalid Credential provided")
            } else {
                ToastMessage.error("An unexpected error occurred while loggin in");
                console.log(error)
            }
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="form-container" method="post">
                <h1>Login</h1>
                <InputField
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    change={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <InputField
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    change={(e) => {
                        setPassword(e.target.value)
                    }}
                />

                <button className="form-button" type="submit">
                    Login
                </button>

                <div><Link to="/forgot-password">Forgot Password? </Link> </div >
                <div>Don't have a account? <Link to="/register">Register</Link> </div >

            </form>
        </>
    )
}