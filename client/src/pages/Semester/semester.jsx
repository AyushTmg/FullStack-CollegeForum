import ToastMessage from '../../utils/toaster/toaster';
import { userDetail } from '../../utils/userDetail/userDetail';
import { useEffect, useState } from 'react';
import QuestionCard from '../../components/Question/question';
import { fetchQuestionListBySemester } from '../../services/Forum/forum';
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/header';


export default function SemesterFilter() {
    const userData = userDetail();
    const [questions, setQuestions] = useState([]);
    const { semester } = useParams()


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetchQuestionListBySemester(semester);
                console.log("Data", response.data)
                if (response.success) {
                    setQuestions(response.data);
                }

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    ToastMessage.error(error.response.data.message || "An error occurred while fetching questions.");
                } else {
                    ToastMessage.error("An unexpected error occurred.", error);
                }
            }
        };

        fetchQuestions();
    }, [semester]);


    return (
        <>
            <Header />
            <div className='d-flex justify-content-center'>
                <div>Welcome {userData.username}</div>
            </div>

            <div className='questions-container'>
                {questions.length > 0 ? questions.map((question) => (
                    <QuestionCard
                        key={question.id}
                        title={question.title}
                        user={question.user}
                        likes={question.likes}
                        timeStamp={question.time_stamp}
                        semester={question.semester}
                        id={question.id}
                    />
                )) : <div>No Data</div>}
            </div>


        </>
    )
}