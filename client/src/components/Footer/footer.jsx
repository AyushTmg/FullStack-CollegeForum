import "./footer.css";

export default function Footer() {
    return (
        <>
            <footer className="text-center text-lg-start bg-dark text-white mt-5 ">


                <section>
                    <div className="container text-center text-md-start mt-5 pt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>Dora
                                </h6>
                                <p className="text-justify">
                                    This project is an interactive web application designed to facilitate discussions and collaboration among college students. Built using Django and React, the platform allows users to create posts, comment on discussions.
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Technologies Used
                                </h6>
                                <p>
                                    <a href="https://www.djangoproject.com/" className="text-reset text-decoration-none" target="_blank">Django</a>
                                </p>
                                <p>
                                    <a href="https://react.dev/" className="text-reset text-decoration-none" target="_blank">React</a>
                                </p>
                                <p>
                                    <a href="https://hackernoon.com/a-beginners-guide-to-html-css-and-javascript" className="text-reset text-decoration-none" target="_blank">HTML | CSS | JS</a>
                                </p>
                                <p>
                                    <a href="https://getbootstrap.com/" className="text-reset text-decoration-none" target="_blank">Bootstrap</a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">


                                <h6 className="text-uppercase fw-bold mb-4">Get in Touch</h6>


                                <p>

                                    <a href="" target="_blank" className="text-reset text-decoration-none">LinkedIn</a>
                                </p>
                                <p>

                                    <a href="" target="_blank" className="text-reset text-decoration-none">Instagram</a>
                                </p>
                                <p>
                                    <a href="" target="_blank" className="text-reset text-decoration-none">Github</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Upcoming Features:
                                </h6>
                                <p>
                                    User Profile Customization
                                </p>
                                <p>
                                    Image Upload for Questions
                                </p>

                                <p>
                                    Responsive And Attractive UI
                                </p>

                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                    © 2021 Copyright: All rights reserved To Dora
                </div>
            </footer>
        </>
    );
}
