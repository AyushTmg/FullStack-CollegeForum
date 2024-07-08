import { useState } from "react";
import "./question.css";
import PropTypes from 'prop-types';
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../utils/toaster/toaster";

export default function QuestionCard({ id, title, user, likes, timeStamp, is_liked, semester }) {
    const [isLiked, setIsLiked] = useState(is_liked);
    const [currentLikes, setCurrentLikes] = useState(likes);
    const navigate = useNavigate();

    const handleViewDetail = async () => {
        try {
            const res = await api.get(`api/forum/questions/${id}/`);
            const questionResponse = res.data;
            const questionDetail = questionResponse.data;

            const ans = await api.get(`api/forum/questions/${id}/answers/`);
            const answerResponse = ans.data;
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
            await api.post(`api/forum/questions/${id}/like/`);
            setIsLiked(true);
            setCurrentLikes(currentLikes + 1);
        } catch (error) {
            ToastMessage.error("Failed to like the question.");
            console.log(error);
        }
    };

    const handleUnlike = async () => {
        try {
            await api.delete(`api/forum/questions/${id}/like/`);
            setIsLiked(false);
            setCurrentLikes(currentLikes - 1);
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
                    {isLiked ? (
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
    is_liked: PropTypes.bool.isRequired,
};
