import './forgotPassword.css'
import { useState } from "react"
import InputField from "../../components/Common/InputField/InputField"
import ToastMessage from "../../utils/toaster/toaster"
import { isAxiosError } from "axios";
import { forgotPassword } from '../../services/Authentication/auth'


export default function ForgotPassword() {
    const [email, setEmail] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await forgotPassword({ email })
            if (response.success) {
                ToastMessage.success(response.message)
                setEmail("");
            }

        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.response)
                ToastMessage.error(error.response.data.message);
            } else {
                ToastMessage.error("An unexpected error occurred.", error);
            }
        }
    }


    return (
        <>
            <div className=" d-flex justify-content-center align-items-center vh-100">
                <div className="row w-100">
                    <div
                        className="col-lg-12 d-flex justify-content-center align-items-center  p-5"
                        style={{
                            borderRadius: '0.25rem',
                            backgroundImage: 'url(/images/forgot_pass.jpeg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center ',
                            backgroundRepeat: 'no-repeat',
                            height: '100vh',
                        }}
                    >
                        <form onSubmit={handleSubmit} method="post" className=" p-5 rounded" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#333333' }}>
                            <h1 className="mb-4">Forgot Password</h1>

                            <div className="mb-3">
                                <InputField
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    change={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </div>
                            <button className="btn btn-primary w-100" type="submit">
                                Send Email
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* <div >

                <div>

                    <form onSubmit={handleSubmit} method="post">
                        <h1>Forgot Password</h1>
                        <InputField
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            change={(e) => {
                                setEmail(e.target.value)
                            }}
                        />

                        <button className="form-button" type="submit">
                            Send Email
                        </button>

                    </form>
                </div>
            </div> */}
        </>
    )
}