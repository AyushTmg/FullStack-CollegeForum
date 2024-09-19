import { SideBar } from '../../components/SideBar/sidebar';
import ToastMessage from '../../utils/toaster/toaster';
import { useEffect, useState } from 'react';
import QuestionCard from '../../components/Question/question';
import { fetchQuestionListBySemester } from '../../services/Forum/forum';
import { useParams } from 'react-router-dom'
import { Loading } from '../../components/Common/Loading/loading';


export default function SemesterFilter() {
    const [questions, setQuestions] = useState([]);
    const { semester } = useParams()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetchQuestionListBySemester(semester);
                setQuestions(response.results);

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
    }, [semester]);


    return (
        <>

            {loading ?
                <Loading />
                :
                <div>

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
                </div>
            }





        </>
    )
}