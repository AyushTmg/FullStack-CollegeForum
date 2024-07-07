import { Link, useNavigate } from 'react-router-dom';
import ToastMessage from '../../utils/toaster/toaster';
import { userDetail } from '../../utils/userDetail/userDetail';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import api from "../../api/api"
import { useEffect, useState } from 'react';
import QuestionCard from '../../components/Question/question';


export default function Home() {
    const navigate = useNavigate()
    const userData = userDetail();
    const [questions, setQuestions] = useState([]);

    // ! For Handeling User Logout
    const logoutClick = () => {
        localStorage.clear()
        ToastMessage.success("Successfully Logged Out")
        return navigate('/login')
    }
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await api.get("api/forum/questions/");
                const response = res.data;
                setQuestions(response);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    ToastMessage.error(error.response.data.message || "An error occurred while fetching questions.");
                } else {
                    ToastMessage.error("An unexpected error occurred.", error);
                }
            }
        };

        fetchQuestions();
    }, []);

    const handleViewDetail = async (id) => {
        try {
            const res = await api.get(`api/forum/questions/${id}/`);
            const questionDetail = res.data;
            navigate(`/question/${id}`, { state: { question: questionDetail } });

        } catch (error) {
            ToastMessage.error("Failed to fetch question details.");
            console.log(error)
        }
    };

    return (
        <>

            {/*For User Logout */}
            <div className='d-flex justify-content-center'>
                <div>Welcome {userData.username}</div>
            </div>

            <div className='questions-container'>
                {questions ? questions.map((question) => (
                    <QuestionCard
                        key={question.id}
                        title={question.title}
                        description={question.description}
                        user={question.user}
                        likes={question.likes}
                        timeStamp={question.time_stamp}
                        onViewDetail={() => handleViewDetail(question.id)}
                    />
                )) : <div>No Data</div>}
            </div>


        </>
    )
}