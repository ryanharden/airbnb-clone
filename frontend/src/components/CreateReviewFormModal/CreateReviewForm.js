import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { createReviewThunk } from '../../store/reviews';
import star from "../../assets/star.256x244.png";
import emptyStar from "../../assets/star-outline.256x244.png";
// import { useParams } from 'react-router-dom';
import './CreateReviewForm.css';

const CreateReview = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    // const { spotId } = useParams();
    // const star =
    // const emptyStar = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
    const [review, setReview] = useState('');
    // const [stars, setStars] = useState(0);
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
        // if (stars <= 0 || isNaN(stars)) errors.push("Please select a number of stars.");

        if (errors.length > 0) {
            setErrors(errors);
            return
        }

        const newReviewData = {
            review,
            cleanliness,
            communication,
            checkin,
            accuracy,
            location,
            value
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
                    <div className="review-form-cleanliness-container">
                        <label className="review-form-label" htmlFor="cleanliness">Cleanliness</label>
                        <div className="review-form-stars-container">
                            <img className='review-star' onClick={() => {
                                setCleanliness(1);
                            }} alt="select to rate item one star" src={cleanliness >= 1 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCleanliness(2);
                            }} alt="select to rate item two star" src={cleanliness >= 2 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCleanliness(3);
                            }} alt="select to rate item three star" src={cleanliness >= 3 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCleanliness(4);
                            }} alt="select to rate item four star" src={cleanliness >= 4 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCleanliness(5);
                            }} alt="select to rate item five star" src={cleanliness >= 5 ? star : emptyStar} />
                        </div>
                    </div>
                    <div className="review-form-cleanliness-container">
                        <label className="review-form-label" htmlFor="communication">Communication</label>
                        <div className="review-form-stars-container">
                            <img className='review-star' onClick={() => {
                                setCommunication(1);
                            }} alt="select to rate item one star" src={communication >= 1 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCommunication(2);
                            }} alt="select to rate item two star" src={communication >= 2 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCommunication(3);
                            }} alt="select to rate item three star" src={communication >= 3 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCommunication(4);
                            }} alt="select to rate item four star" src={communication >= 4 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCommunication(5);
                            }} alt="select to rate item five star" src={communication >= 5 ? star : emptyStar} />
                        </div>
                    </div>
                    <div className="review-form-cleanliness-container">
                        <label className="review-form-label" htmlFor="checkin">Check-In</label>
                        <div className="review-form-stars-container">
                            <img className='review-star' onClick={() => {
                                setCheckin(1);
                            }} alt="select to rate item one star" src={checkin >= 1 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCheckin(2);
                            }} alt="select to rate item two star" src={checkin >= 2 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCheckin(3);
                            }} alt="select to rate item three star" src={checkin >= 3 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCheckin(4);
                            }} alt="select to rate item four star" src={checkin >= 4 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setCheckin(5);
                            }} alt="select to rate item five star" src={checkin >= 5 ? star : emptyStar} />
                        </div>
                    </div>
                    <div className="review-form-cleanliness-container">
                        <label className="review-form-label" htmlFor="accuracy">Accuracy</label>
                        <div className="review-form-stars-container">
                            <img className='review-star' onClick={() => {
                                setAccuracy(1);
                            }} alt="select to rate item one star" src={accuracy >= 1 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setAccuracy(2);
                            }} alt="select to rate item two star" src={accuracy >= 2 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setAccuracy(3);
                            }} alt="select to rate item three star" src={accuracy >= 3 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setAccuracy(4);
                            }} alt="select to rate item four star" src={accuracy >= 4 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setAccuracy(5);
                            }} alt="select to rate item five star" src={accuracy >= 5 ? star : emptyStar} />
                        </div>
                    </div>
                    <div className="review-form-cleanliness-container">
                        <label className="review-form-label" htmlFor="location">Location</label>
                        <div className="review-form-stars-container">
                            <img className='review-star' onClick={() => {
                                setLocation(1);
                            }} alt="select to rate item one star" src={location >= 1 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setLocation(2);
                            }} alt="select to rate item two star" src={location >= 2 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setLocation(3);
                            }} alt="select to rate item three star" src={location >= 3 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setLocation(4);
                            }} alt="select to rate item four star" src={location >= 4 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setLocation(5);
                            }} alt="select to rate item five star" src={location >= 5 ? star : emptyStar} />
                        </div>
                    </div>
                    <div className="review-form-cleanliness-container">
                        <label className="review-form-label" htmlFor="value">Value</label>
                        <div className="review-form-stars-container">
                            <img className='review-star' onClick={() => {
                                setValue(1);
                            }} alt="select to rate item one star" src={value >= 1 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setValue(2);
                            }} alt="select to rate item two star" src={value >= 2 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setValue(3);
                            }} alt="select to rate item three star" src={value >= 3 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setValue(4);
                            }} alt="select to rate item four star" src={value >= 4 ? star : emptyStar} />
                            <img className='review-star' onClick={() => {
                                setValue(5);
                            }} alt="select to rate item five star" src={value >= 5 ? star : emptyStar} />
                        </div>
                    </div>
                    <textarea className='review-form-textarea'
                        type="text"
                        placeholder="Tell us about your stay"
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
