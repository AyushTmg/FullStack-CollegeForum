import "./header.css"
import { userDetail } from '../../utils/userDetail/userDetail';
import ToastMessage from '../../utils/toaster/toaster';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';



export default function Header() {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("")
    const userData = userDetail();
    // ! For Handeling User Logout
    const logoutClick = () => {
        localStorage.clear()
        ToastMessage.success("Successfully Logged Out")
        return navigate('/login')
    }

    const routeBySemester = (semester) => {
        navigate(`/semester/${semester}`)
    }

    const handleSearchSubmit = () => {
        navigate(`/search/${searchText}`)
    }


    return (
        <>
            <header className="navbar-dark bg-dark text-white ">
                <div className="row">
                    <div className="d-flex justify-content-between text-white">
                        <div className="d-flex justify-content-evenly col-lg-8 col-md-8 col-sm-10">
                            <div className="nav-item cursor-pointer" onClick={() => navigate('/ask-question')}>Ask  Question</div>
                            <div className="nav-item">
                                <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                                    <input className="form-control me-2" type="search" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />

                                    <button className="btn btn-success" type="submit">Search</button>
                                </form>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end col-lg-4 col-md-4 col-sm-2 ">
                            <button className="navbar-toggler p-3" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>

                        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar"
                            aria-labelledby="offcanvasDarkNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Hamburger</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <a className="nav-link active cursor-pointer" aria-current="page" onClick={() => navigate('/change-password')} >

                                            Change Password
                                        </a>
                                    </li>

                                    <li className="nav-item dropdown" id="side-semester">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Semester
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-dark">
                                            <li><button className="dropdown-item" onClick={() => routeBySemester('1st Semester')} >1st Semester</button></li>
                                            <li><button className="dropdown-item" onClick={() => routeBySemester('2nd Semester')} >2nd Semester</button></li>
                                            <li><button className="dropdown-item" onClick={() => routeBySemester('3rd Semester')} >3rd Semester</button></li>
                                            <li><button className="dropdown-item" onClick={() => routeBySemester('4th Semester')} >4th Semester</button></li>
                                            <li><button className="dropdown-item" onClick={() => routeBySemester('5th Semester')} >5th Semester</button></li>
                                            <li><button className="dropdown-item" onClick={() => routeBySemester('6th Semester')} >6th Semester</button></li>
                                            <li><button className="dropdown-item" onClick={() => routeBySemester('7th Semester')} >7th Semester</button></li>
                                            <li><button className="dropdown-item" onClick={() => routeBySemester('8th Semester')} >8th Semester</button></li>
                                        </ul>
                                        <ul className="dropdown-menu dropdown-menu-dark">

                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item" id="logout">
                                        <div onClick={logoutClick} className="nav-link">
                                            Logout
                                        </div>
                                    </li>
                                </ul>

                                {/* <form className="d-flex mt-3" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-success" type="submit">Search</button>
                                </form> */}
                            </div>
                        </div>

                    </div>

                </div>
            </header >

        </>
    );
}
