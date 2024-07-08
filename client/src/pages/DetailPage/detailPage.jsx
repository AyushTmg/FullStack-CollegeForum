import "./detailPage.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { userDetail } from "../../utils/userDetail/userDetail";
import { useState } from "react";
import api from "../../api/api";
import { isAxiosError } from "axios";
import Answer from "../../components/Answer/answer";
import ToastMessage from "../../utils/toaster/toaster";
import InputField from "../../components/Common/InputField/InputField"



export default function DetailPage() {
    const userData = userDetail();
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location
    const question = state.question;
    const answers = state.answers ? state.answers : [];


    const [isAnswering, setIsAnswering] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [description, setDescription] = useState("");


    const handleDelete = async () => {
        try {
            const res = await api.delete(`api/forum/questions/${question.id}/`)
            const response = res.data;

            if (response.success) {
                ToastMessage.success(response.message)
                navigate('/')
            }
        } catch (error) {
            if (isAxiosError(error)) {
                ToastMessage.error(error.response.data.message);
            } else {
                ToastMessage.error("An unexpected error occurred.", error);
                console.log("Thsi is un", error)
            }
        }
    }

    const handleAnswerSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post(`api/forum/questions/${question.id}/answers/`, {
                description: description,
                user_id: userData.user_id
            })
            const response = res.data;

            if (response.success) {
                ToastMessage.success(response.message)
                setDescription("")
                setIsAnswering(!isAnswering)
            }
        } catch (error) {
            if (isAxiosError(error)) {
                ToastMessage.error(error.response.data.message);
            } else {
                ToastMessage.error("An unexpected error occurred.", error);
                console.log("Thsi is un", error)
            }
        }
    }

    return (
        <>
            <div>
                <h5 className="card-title">{question.title}</h5>
                <hr />
                <p className="card-text"><small >Posted by: {question.user}</small></p>
                <p className="card-text"><small >Likes: {question.likes}</small></p>
                <p className="card-text"><small >Description: {question.description}</small></p>
                <p className="card-text"><small >Time: {new Date(question.time_stamp).toLocaleString()}</small></p>


                {/* For Showing Option To Delete The Post  */}
                {userData.username == question.user ? <button className="btn btn-danger" onClick={() => setIsDeleting(!isDeleting)}>Delete</button> : null}

                {isDeleting &&
                    <div>
                        <div>Do you want to delete?</div>
                        <div className="btn btn-primary" onClick={() => setIsDeleting(!isDeleting)}>Cancel</div>
                        <div className="btn btn-danger" onClick={handleDelete}>Confirm</div>
                    </div>
                }

                {/* ! For Answering Question  */}
                <button onClick={() => setIsAnswering(!isAnswering)} className="btn btn-primary">Answer Question</button>

                {isAnswering &&
                    <div className="card justify-content-center">
                        <form method="post" onSubmit={handleAnswerSubmit}>
                            <textarea
                                name="description"
                                placeholder="Enter your answer"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                                style={{ height: '200px' }}
                            />

                            <button className="btn btn-primary">Submit</button>
                            <button className="btn btn-danger" onClick={() => setIsAnswering(!isAnswering)}>Cancel</button>
                        </form>
                    </div>
                }



                {/* ! Answer Related Question  */}
                <div className="card">
                    <h1 className="text-center">Answers</h1>
                    {answers && answers.map((answer) => (
                        <Answer
                            key={answer.id}
                            questionId={question.id}
                            id={answer.id}
                            user={answer.user}
                            description={answer.description}
                            timeStamp={answer.time_stamp}
                        />
                    ))}
                </div>

            </div>
        </>
    )
}