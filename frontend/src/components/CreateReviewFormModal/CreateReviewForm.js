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

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const currentUser = useSelector(state => state.session.user);

    const spotId = useSelector((state) => state.Spots.singleSpot.id);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        const newReviewData = {
            review,
            stars
        };

        const reviewDetails = {
            User: currentUser,
            ReviewImages: []
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
            {currentUser ?
                <>
                    <div className='review-form-header'>
                        <h1>Create a review</h1>
                    </div>
                    <div className='review-form-container'>
                        <form className='review-form' onSubmit={handleSubmit}>
                            <ul className='errors-review'>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <textarea className='review-form-textarea'
                                type="text"
                                placeholder="Leave a review here"
                                required
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                            <select className='review-form-stars' value={stars} onChange={(e) => setStars(parseInt(e.target.value))}>
                                <option value=''>Stars</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <button className='review-form-button' type="submit">Create New Review</button>
                        </form>
                    </div>
                </>
                : <div className='not-logged-in'>You must be logged in to create a review</div>
            }
        </>
    )
}

export default CreateReview;
