import ToastMessage from '../../utils/toaster/toaster';
import { userDetail } from '../../utils/userDetail/userDetail';
import { useEffect, useState } from 'react';
import QuestionCard from '../../components/Question/question';
import { fetchQuestionList } from '../../services/Forum/forum';


export default function Home() {
    const userData = userDetail();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetchQuestionList();
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
    }, []);


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