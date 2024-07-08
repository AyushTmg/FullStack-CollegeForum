import "./answer.css"
import { userDetail } from "../../utils/userDetail/userDetail"
import api from "../../api/api"
import ToastMessage from "../../utils/toaster/toaster"
import { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"

export default function Answer({ id, questionId, user, description, timeStamp }) {
    const userData = userDetail()
    const loggedUser = userData.username
    const navigate = useNavigate()


    const handleAnswerDelete = async () => {
        try {
            const res = await api.delete(`api/forum/questions/${questionId}/answers/${id}/`)
            const response = res.data;
            if (response.success) {
                ToastMessage.success(response.message)
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

    return (
        <>
            <div className="p-5 bg-primary text-white mt-5">
                <div>User {user}</div>
                <div>Description {description}</div>
                <div>TimeStamp {timeStamp}</div>

                {loggedUser == user &&
                    <div className="btn btn-danger" onClick={handleAnswerDelete}>Delete</div>
                }
                <button className="btn btn-success">Like</button>
            </div>
        </>
    )
}