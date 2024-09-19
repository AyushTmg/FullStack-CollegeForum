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
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetchQuestionList(page);
                setTotalPages(Math.ceil(response.count / 10));
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
    }, [page]);

    const handlePagination = (newPage) => {
        if (newPage > 0 && newPage <= totalPage) {
            setPage(newPage)
            setLoading(true)
        }
    }


    return (
        <>
            {loading ?
                <Loading />
                :
                <div>
                    <div className="col-lg-12">
                        <div className=''>
                            {questions ? questions.map((question) => (
                                <QuestionCard
                                    key={question.id}
                                    title={question.title}
                                    user={question.user}
                                    likes={question.likes}
                                    timeStamp={question.time_stamp}
                                    semester={question.semester}
                                    id={question.id}
                                    answer_count={question.answer_count}
                                />
                            )) : <div>No Data</div>}
                        </div>
                    </div >

                    <div className='mt-5 d-flex justify-content-center'>
                        <nav aria-label="...">
                            <ul className="pagination">
                                <li className={`page-item ${page === 1 ? "disabled" : "cursor-pointer"}`}>
                                    <span className="page-link " onClick={() => handlePagination(page - 1)}>Previous</span>
                                </li>

                                {Array.from({ length: totalPage }, (_, index) => (
                                    <li key={index + 1} className={`page-item ${page === index + 1 ? "active" : ""} cursor-pointer`}>
                                        <a className="page-link" onClick={() => handlePagination(index + 1)}>
                                            {index + 1}
                                        </a>
                                    </li>
                                ))}

                                <li className={`page-item ${page === totalPage ? "disabled" : "cursor-pointer"}`}>
                                    <a className="page-link" onClick={() => handlePagination(page + 1)}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div >
            }
        </>
    )
}