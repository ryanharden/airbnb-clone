import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { createReviewThunk } from '../../store/reviews';
// import { useParams } from 'react-router-dom';
import './CreateReviewForm.css';

const CreateReview = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    // const { spotId } = useParams();
    const star = <i className="fa-sharp fa-solid fa-star"></i>
    const emptyStar = <i className="fa-sharp fa-light fa-star"></i>
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);



    const [cleanliness, setCleanliness] = useState(0);
    const [communication, setCommunication] = useState(0);
    const [checkin, setCheckin] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [location, setLocation] = useState(0);
    const [value, setValue] = useState(0);

    const { closeModal } = useModal();
    const currentUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.Spots.singleSpot);
    const spotId = useSelector((state) => state.Spots.singleSpot.id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        const errors = [];
        if (review.length === 0) errors.push("Please enter a review.");
        if (stars <= 0 || isNaN(stars)) errors.push("Please select a number of stars.");

        if (errors.length > 0) {
            setErrors(errors);
            return
        }

        const newReviewData = {
            review,
            stars
        };

        const reviewDetails = {
            User: currentUser,
            // ReviewImages: []
        };

        dispatch(createReviewThunk(spotId, newReviewData, reviewDetails))
            // .then(() => history.push(`/spot/${spotId}`))
            .then(closeModal())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors))
            });
    };

    return (
        <>
            <div className='spot-form-header-container'>
                <div className='spot-form-header'>
                    <h1>Create a review</h1>
                </div>
                <div onClick={(e) => closeModal()} className='close-modal-x'>
                    <i className="fa-solid fa-xmark fa-lg"></i>
                </div>
            </div>
            <div className='review-form-container'>
                <form className='review-form' onSubmit={handleSubmit}>
                    <ul className='errors-review'>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className="review-form-input">
                        <label className="review-form-label" htmlFor="cleanliness">Cleanliness</label>
                        <div className="review-form-stars-container">
                            <i onClick={() => {
                                setCleanliness(1);
                            }} alt="select to rate item one star" src={cleanliness >= 1 ? star : emptyStar} />
                            <img onClick={() => {
                                setCleanliness(2);
                            }} alt="select to rate item two star" src={cleanliness >= 2 ? star : emptyStar} />
                            <img onClick={() => {
                                setCleanliness(3);
                            }} alt="select to rate item three star" src={cleanliness >= 3 ? star : emptyStar} />
                            <img onClick={() => {
                                setCleanliness(4);
                            }} alt="select to rate item four star" src={cleanliness >= 4 ? star : emptyStar} />
                            <img onClick={() => {
                                setCleanliness(5);
                            }} alt="select to rate item five star" src={cleanliness >= 5 ? star : emptyStar} />
                        </div>
                    </div>
                    <textarea className='review-form-textarea'
                        type="text"
                        placeholder="Leave a review here"
                        required
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    {/* <select className='review-form-stars' value={stars} onChange={(e) => setStars(parseInt(e.target.value))}>
                        <option value=''>Stars</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select> */}
                    <button className='review-form-button' type="submit">Create New Review</button>
                </form>
            </div>
        </>
    )
}

export default CreateReview;
