import "./question.css"
import PropTypes from 'prop-types';

export default function QuestionCard({ title, description, user, likes, timeStamp, onViewDetail }) {
    return (
        <>
            <div className="card mb-3 text-center bg-primary " >
                <div className="card-body text-white">
                    <h5 className="card-title">{title}</h5>
                    <hr />
                    <p className="card-text"><small >Posted by: {user}</small></p>
                    <p className="card-text"><small >Likes: {likes}</small></p>
                    <p className="card-text"><small >Time: {new Date(timeStamp).toLocaleString()}</small></p>
                    <button className="btn btn-primary me-2" onClick={onViewDetail}>View Details</button>
                </div>
            </div>
        </>
    )
}

QuestionCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    timeStamp: PropTypes.string.isRequired
};