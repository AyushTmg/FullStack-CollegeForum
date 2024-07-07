import "./detailPage.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { userDetail } from "../../utils/userDetail/userDetail";
import { useState } from "react";
import api from "../../api/api";
import { isAxiosError } from "axios";
import ToastMessage from "../../utils/toaster/toaster";


export default function DetailPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location
    const question = state.question;
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const userData = userDetail();

    const handleDelete = () => {
        try {
            const res = api.delete(`api/forum/questions/${question.id}/`)
            ToastMessage.success("Successfully Deleted")
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

    const handleEdit = () => {
        console.log("Editing")
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

                {userData.username == question.user ? <button className="btn btn-primary" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancel" : "Edit"}
                </button>
                    : null}
                {userData.username == question.user ? <button className="btn btn-danger" onClick={() => setIsDeleting(!isDeleting)}>Delete</button> : null}

                {isDeleting &&
                    <div>
                        <div>Do you want to delete?</div>
                        <div className="btn btn-primary" onClick={() => setIsDeleting(!isDeleting)}>Cancel</div>
                        <div className="btn btn-danger" onClick={handleDelete}>Confirm</div>
                    </div>
                }

            </div>
        </>
    )
}