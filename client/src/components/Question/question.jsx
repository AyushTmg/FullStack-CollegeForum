import {
    fetchInitalQuestionLikeStatus,
    likeQuestion,
    unlikeQuestion,
    fetchQuestionDetail,
    fetchAnswerListRelatedToSpecificQuestion
} from "../../services/Forum/forum";
import { useState, useEffect } from "react";
import "./question.css";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../utils/toaster/toaster";



export default function QuestionCard({ id, title, user, likes, timeStamp, semester, is_liked }) {
    const [isLiked, setIsLiked] = useState(is_liked);
    const [currentLikes, setCurrentLikes] = useState(likes);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        try {
            async function fetchIntialStatus() {
                const response = await fetchInitalQuestionLikeStatus(id);
                if (response.success) {
                    setIsLiked(response.data.is_liked)
                    setLoading(false)
                }
            }
            fetchIntialStatus()
        } catch (error) {
            ToastMessage.error("Error alert");
            console.log(error)
            setLoading(false)

        }

    }, [])


    const handleViewDetail = async () => {
        try {
            const questionResponse = await fetchQuestionDetail(id);
            const questionDetail = questionResponse.data;

            const answerResponse = await fetchAnswerListRelatedToSpecificQuestion(id);
            const answerList = answerResponse.data

            if (questionResponse.success && answerResponse.success) {
                navigate(`/question/${id}`, {
                    state: {
                        question: questionDetail,
                        answers: answerList
                    }
                });
            }

        } catch (error) {
            ToastMessage.error("Failed to fetch question details.");
            console.log(error);
        }
    };

    const handleLike = async () => {
        try {
            await likeQuestion(id);
            setIsLiked(true);
            setCurrentLikes((prevLike) => prevLike + 1);
        } catch (error) {
            ToastMessage.error("Failed to like the question.");
            console.log(error);
        }
    };

    const handleUnlike = async () => {
        try {
            await unlikeQuestion(id);
            setIsLiked(false);
            setCurrentLikes((prevLike) => prevLike - 1);
        } catch (error) {
            ToastMessage.error("Failed to unlike the question.");
            console.log(error);
        }
    };

    return (
        <>
            <div className="card mb-3 text-center bg-primary">
                <div className="card-body text-white">
                    <h5 className="card-title">{title}</h5>
                    <hr />
                    <p className="card-text"><small>Posted by: {user}</small></p>
                    <p className="card-text"><small>Likes: {currentLikes}</small></p>
                    <p className="card-text"><small>Semester: {semester}</small></p>
                    <p className="card-text"><small>Time: {new Date(timeStamp).toLocaleString()}</small></p>
                    <button className="btn btn-primary me-2" onClick={handleViewDetail}>View Details</button>

                    {loading ? (
                        <div>Loading...</div>
                    ) : isLiked ? (
                        <button className="btn btn-success" onClick={handleUnlike}>Unlike</button>
                    ) : (
                        <button className="btn btn-success" onClick={handleLike}>Like</button>
                    )}
                </div>
            </div>
        </>
    );
}

QuestionCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    timeStamp: PropTypes.string.isRequired,
};
