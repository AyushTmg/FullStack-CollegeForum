import { useState } from "react"
import "./login.css"
import { useNavigate } from "react-router-dom"
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
            <section className="vh-100 d-flex">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="/images/doremon.webp"
                                className="img-fluid vh-100"
                                alt="Sample"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit} method="post">
                                <div>
                                    <p className="lead fw-normal mb-0 me-3"></p>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0"></p>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" name="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} required />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input type="password" id="form3Example4" name="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }} className="form-control form-control-lg" required />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">Remember me</label>
                                    </div>

                                    <div className="fw-bold"><Link to="/forgot-password" className="link-danger">Forgot Password? </Link> </div >

                                </div>

                                <div className="d-flex justify-content-center text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p className=" fw-bold mt-2 pt-1 mb-0">Don't have an account? &nbsp;&nbsp;&nbsp; <Link to="/register" className="link-danger">Register</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}