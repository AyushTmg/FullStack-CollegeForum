import "./answer.css"
import { userDetail } from "../../utils/userDetail/userDetail"
import ToastMessage from "../../utils/toaster/toaster"
import { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { fetchInitialAnswerLikeStatus, likeAnswer, unlikeAnswer } from "../../services/Forum/forum"

export default function Answer({ id, questionId, user, description, timeStamp, likes, onDeleteAnswer }) {
    const userData = userDetail()
    const loggedUser = userData.username
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(likes);
    const [isDeleting, setIsDeleting] = useState(false);



    useEffect(() => {
        try {
            async function fetchIntialStatus() {
                const response = await fetchInitialAnswerLikeStatus(questionId, id);
                if (response.success) {
                    setIsLiked(response.data.is_liked)
                }
            }
            fetchIntialStatus()
        } catch (error) {
            ToastMessage.error("Error alert");
            console.log(error)

        }

    }, [])


    const handleAnswerLike = async () => {
        try {
            const response = await likeAnswer(questionId, id);
            if (response.success) {
                setIsLiked(true);
                setCurrentLikes((prevLikes) => prevLikes + 1);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                ToastMessage.error(error.response.data.message);
            } else {
                ToastMessage.error("An unexpected error occurred.", error);
                console.log("Thsi is error", error)
            }
        }
    }

    const handleAnswerUnlike = async () => {
        try {
            await unlikeAnswer(questionId, id);
            setIsLiked(false);
            setCurrentLikes((prevLikes) => prevLikes - 1);

        } catch (error) {
            if (isAxiosError(error)) {
                ToastMessage.error(error.response.data.message);
            } else {
                ToastMessage.error("An unexpected error occurred.");
                console.log("Thsi is error", error)
            }
        }
    }



    return (
        <>

            <div className="p-5 bg-primary text-white mt-5">
                <div>User {user}</div>
                <div>Description {description}</div>
                <div>TimeStamp {timeStamp}</div>
                <div>Likes {currentLikes}</div>

                {loggedUser == user &&

                    <div className="btn btn-danger" onClick={() => setIsDeleting(!isDeleting)}>Delete</div>
                }
                {isDeleting &&
                    <div>
                        <div>Do you want to delete?</div>
                        <div className="btn btn-primary" onClick={() => setIsDeleting(!isDeleting)}>Cancel</div>
                        <div className="btn btn-danger" onClick={onDeleteAnswer}>Confirm</div>
                    </div>
                }


                {isLiked ? (
                    <button className="btn btn-success" onClick={handleAnswerUnlike}>Unlike</button>
                ) : (
                    <button className="btn btn-success" onClick={handleAnswerLike}>Like</button>
                )}
            </div>
        </>
    )
}
