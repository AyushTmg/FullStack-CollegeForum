import './post.css'
import InputField from '../../components/Common/InputField/InputField'
import { useState } from 'react'
import { userDetail } from '../../utils/userDetail/userDetail';
import ToastMessage from '../../utils/toaster/toaster';
import { isAxiosError } from "axios";
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../../services/Forum/forum';

const SEMESTER_CHOICES = [
    '1st Semester',
    '2nd Semester',
    '3rd Semester',
    '4th Semester',
    '5th Semester',
    '6th Semester',
    '7th Semester',
    '8th Semester',
];

export default function CreatePost() {
    const navigate = useNavigate()

    const userData = userDetail()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [semester, setSemester] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createQuestion({
                title: title,
                description: description,
                semester: semester,
                user_id: userData.user_id
            });

            console.log(title, description, semester)
            if (response.success) {
                ToastMessage.success(response.message)
                navigate('/login')
            }
        }
        catch (error) {
            if (isAxiosError(error)) {
                ToastMessage.error(error.response.data.message);
            } else {
                ToastMessage.error("An unexpected error occurred.", error);
                console.log(error)
            }
        }
    }

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    name="title"
                    placeholder="Enter the title"
                    value={title}
                    change={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <InputField
                    type="text"
                    name="description"
                    placeholder="Enter the description"
                    value={description}
                    change={(e) => {
                        setDescription(e.target.value)
                    }}
                />
                <div>
                    <label htmlFor="semester">Select Semester</label>
                    <select
                        id="semester"
                        name="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                    >
                        <option value="">Select a semester</option>
                        {SEMESTER_CHOICES.map((semesterChoice) => (
                            <option key={semesterChoice} value={semesterChoice}>
                                {semesterChoice}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" >Submit</button>
            </form>
        </>
    )
}
