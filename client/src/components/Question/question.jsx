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

            <div className="bg-dark p-4 m-2 border-white">
                <div className="d-flex justify-content-around ">
                    <h5 className="">{title}</h5>
                    <p className=""><small>Time: {new Date(timeStamp).toLocaleString()}</small></p>
                </div>

                <div className="d-flex justify-content-around">
                    <div className="d-flex justify-content-between">
                        {/* <p className=""><small>Posted by: {user}</small></p> */}
                        &nbsp;
                        &nbsp;
                        <p className="semester"><small>{semester}</small></p>
                    </div>

                    <div>
                        <button className="btn btn-primary me-2" onClick={() => navigate(`/question/${id}`)}>View Details</button>
                        {loading ? (
                            <div>Loading...</div>
                        ) : isLiked ? (
                            <button className="btn btn-success" onClick={handleUnlike}>Unlike</button>
                        ) : (
                            <button className="btn btn-success" onClick={handleLike}>Like</button>
                        )}
                        &nbsp;
                        &nbsp;
                        <small>Likes: {currentLikes}</small>

                    </div>
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
