import ToastMessage from '../../utils/toaster/toaster';
import { userDetail } from '../../utils/userDetail/userDetail';
import { useEffect, useState } from 'react';
import QuestionCard from '../../components/Question/question';
import { fetchQuestionListBySearch } from '../../services/Forum/forum';
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/header';


export default function SearchFilter() {
    const userData = userDetail();
    const [questions, setQuestions] = useState([]);
    const { str } = useParams()


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetchQuestionListBySearch(str);
                setQuestions(response.results);

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    ToastMessage.error(error.response.data.message || "An error occurred while fetching questions.");
                } else {
                    ToastMessage.error("An unexpected error occurred.", error);
                }
            }
        };

        fetchQuestions();
    }, [str]);


    return (
        <>

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