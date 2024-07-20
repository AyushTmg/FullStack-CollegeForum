import ToastMessage from '../../utils/toaster/toaster';
import { userDetail } from '../../utils/userDetail/userDetail';
import { useEffect, useState } from 'react';
import QuestionCard from '../../components/Question/question';
import { fetchQuestionList } from '../../services/Forum/forum';
import { Loading } from '../../components/Common/Loading/loading';
import "./home.css"

export default function Home() {
    const userData = userDetail();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetchQuestionList();
                if (response.success) {
                    setQuestions(response.data);
                }
                setLoading(false)
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
            {loading ?
                <Loading />
                :
                <div>
                    <div className="col-lg-12">
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

                    </div >
                </div >
            }


        </>
    )
}