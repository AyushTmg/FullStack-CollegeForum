import "./detailPage.css"
import { useNavigate, useParams } from 'react-router-dom';
import { userDetail } from "../../utils/userDetail/userDetail";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import Answer from "../../components/Answer/answer";
import ToastMessage from "../../utils/toaster/toaster";
import { createAnswer, deleteQuestion, fetchQuestionDetail, fetchAnswerListRelatedToSpecificQuestion, deleteAnswer } from "../../services/Forum/forum";
import { Loading } from "../../components/Common/Loading/loading";


export default function DetailPage() {
    const userData = userDetail();
    const navigate = useNavigate()
    const { id } = useParams()

    const [isAnswering, setIsAnswering] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loaded, setLoading] = useState(false)
    const [description, setDescription] = useState("");
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        try {
            async function fetchData() {
                const questionResponse = await fetchQuestionDetail(id);
                setQuestion(questionResponse.data);

                const answerResponse = await fetchAnswerListRelatedToSpecificQuestion(id);
                setAnswers(answerResponse.data)
                setLoading(true);
            }
            fetchData();
        } catch (error) {
            ToastMessage.error("Failed to fetch question details.");
            console.log(error);
        }
    }, [])



    const handleDelete = () => {
        try {
            deleteQuestion(question.id)
            ToastMessage.success("Successfullly Deleted")
            navigate('/')
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
            const response = await createAnswer(
                {
                    description: description,
                    user_id: userData.user_id
                }, question.id
            );
            try {
                const answerResponse = await fetchAnswerListRelatedToSpecificQuestion(id);
                setAnswers(answerResponse.data)

            } catch (error) {
                ToastMessage.error("Failed to fetch Answers List.");
                console.log(error);
            }

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

    const handleAnswerDelete = (questionId, id) => {
        try {
            console.log(id)
            deleteAnswer(questionId, id);

            console.log("this is trigger")

            const newAnswers = answers?.filter((ans) => ans.id !== id);

            setAnswers(newAnswers);

            ToastMessage.success("Deleted Successfully")
        } catch (error) {
            if (isAxiosError(error)) {
                ToastMessage.error(error.response.data.message);
            } else {
                ToastMessage.error("An unexpected error occurred.", error);
                console.log("Thsi is error", error)
            }
        }
    }

    return (
        <>
            {loaded ?
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



                    <div className="card">
                        <h1 className="text-center">Answers</h1>
                        {answers && answers.map((answer) => (
                            <Answer
                                key={answer.id}
                                questionId={question.id}
                                id={answer.id}
                                user={answer.user}
                                description={answer.description}
                                likes={answer.likes}
                                timeStamp={answer.time_stamp}
                                onDeleteAnswer={() => handleAnswerDelete(question.id, answer.id)}
                            />
                        ))}
                    </div>

                </div>
                : <Loading />
            }
        </>
    )
}