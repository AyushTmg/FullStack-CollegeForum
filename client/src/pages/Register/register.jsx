import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import ToastMessage from "../../utils/toaster/toaster";
import { isAxiosError } from "axios";
import { userRegister } from "../../services/Authentication/auth";
import RegisterInputField from "../../components/Common/InputField/RegisterInputFields";

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});
        setErrorMessage('');
        try {

            const response = await userRegister({
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            })

            if (response.success) {
                ToastMessage.success(response.message);
                return navigate('/login');
            }
        } catch (error) {
            if (isAxiosError(error)) {
                setErrorMessage(error.response.data.message);
                setError(error.response.data.errors);
                ToastMessage.error(errorMessage);
            } else {
                ToastMessage("Some Error Occured In FrontEnd While Registering User")
                console.log(error)
            }

        }
    };

    return (
        <>
            <section style={{ height: '100vh' }}>
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col my-4">
                            <div className="row g-0">
                                <div className="col-xl-5 d-none d-xl-block">
                                    <img src="/images/happy_dora.webp" alt="Sample" className="img-fluid" style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }} />
                                </div>


                                <div className="col-xl-7">

                                    <div className="p-md-5 text-white">
                                        <h3 className="mb-5 text-uppercase">Registration Form</h3>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <RegisterInputField
                                                            type='text'
                                                            name='firstname'
                                                            label="First Name"
                                                            placeholder="Enter your first name"
                                                            value={firstName}
                                                            change={(e) => setFirstName(e.target.value)}
                                                            error={error.first_name}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <RegisterInputField
                                                            type='text'
                                                            name='lastname'
                                                            label="Last Name"
                                                            placeholder="Enter your last name"
                                                            value={lastName}
                                                            change={(e) => setLastName(e.target.value)}
                                                            error={error.last_name}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <RegisterInputField
                                                            type='text'
                                                            name="username"
                                                            label="Username"
                                                            placeholder="Enter your username"
                                                            value={username}
                                                            change={(e) => setUsername(e.target.value)}
                                                            error={error.username}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <RegisterInputField
                                                            type="email"
                                                            name="email"
                                                            label="Email"
                                                            placeholder="Enter your email"
                                                            value={email}
                                                            change={(e) => setEmail(e.target.value)}
                                                            error={error.email}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <RegisterInputField
                                                    type="password"
                                                    name="password"
                                                    label="Password"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    change={(e) => setPassword(e.target.value)}
                                                    error={error.password}
                                                />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <RegisterInputField
                                                    type="password"
                                                    label="Repeat Password "
                                                    name="passwordConfirmation"
                                                    placeholder="Repeat your password"
                                                    value={passwordConfirmation}
                                                    change={(e) => setPasswordConfirmation(e.target.value)}
                                                    error={error.password_confirmation}
                                                />
                                            </div>

                                            <div className="d-flex justify-content-center ">
                                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg ms-2">Register</button>

                                            </div>
                                            <div className="fw-bold d-flex justify-content-center  pt-3">
                                                <div>
                                                    Already have an account? <Link to="/login" className="link-danger">
                                                        Login
                                                    </Link>
                                                </div>
                                            </div>
                                            {/* <div className="d-flex justify-content-between align-items-center pt-3">
                                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg ms-2">Register</button>

                                                <div className="fw-bold">
                                                    Already have an account? <Link to="/login" className="link-danger">
                                                        Login
                                                    </Link>
                                                </div>
                                            </div> */}

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
