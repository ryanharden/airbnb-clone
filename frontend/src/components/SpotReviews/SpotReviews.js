import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/reviews';
import SpotReviewsIndexItem from "../SpotReviewsIndexItem/SpotReviewsIndexItem";
import CreateReview from '../CreateReviewFormModal/CreateReviewForm';
import star from "../../assets/star.png";
import "./SpotReviews.css";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';

const SpotReviews = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.Spots.singleSpot);
    // console.log(spot);

    const spotReviews = useSelector(state => state.Reviews.spot);
    // console.log(spotReviews);

    const spotReviewsArr = Object.values(spotReviews);
    // console.log(spotReviewsArr)

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId))
    }, [dispatch, spotId]);

    // if (!spotReviewsArr.length) return null;

    const first6Reviews = spotReviewsArr.slice(0, 6);

    const reviewItems = spotReviewsArr.map((review) => {
        return <SpotReviewsIndexItem key={review.id} review={review} spot={spot} />
    });

    let avgSpotRating = 0;

    if (spotReviewsArr.length > 0) {
        spotReviewsArr.forEach(review => {
            avgSpotRating += review.stars;
        })
        avgSpotRating = avgSpotRating / spotReviewsArr.length
    }

    // console.log("user.id: ", user.id);
    // console.log("spot.ownerId: ", spot.ownerId)

    return (
        <>
            {spotReviewsArr.length ? (
                <>
                    <div className='spot-reviews-container'>
                        <div className='spot-reviews-header'>
                            <div className='avgStarRating-numReviews'>
                                <div id="avgStarRating"><img id="review-star" src={star} alt="" />{avgSpotRating.toFixed(2)}</div>
                                <div id='review-period'>•</div>
                                <div id="numReviewsBig">{spotReviewsArr.length} review(s)</div>
                            </div>
                            {user?.id !== spot?.ownerId && <div className='create-review-modal-button'>
                                <img className='review-icon' src="https://cdn-icons-png.flaticon.com/512/2983/2983706.png" alt="review-icon" />
                                <OpenModalButton
                                    className="create-review-modal"
                                    modalComponent={user ? <CreateReview /> : <LoginFormModal />}
                                    buttonText="Create a review"
                                />
                            </div>
                            }
                        </div>
                        <div className='spot-reviews-item-container'>
                            <ul className='reviews-wrapper'>
                                {first6Reviews.map((review) => {
                                    return <SpotReviewsIndexItem key={review.id} review={review} spot={spot} />
                                })}
                            </ul>
                        </div>
                        {spotReviewsArr.length > 6 && (
                            <div className='extra-reviews'>
                                <OpenModalButton
                                    className="all-reviews-modal"
                                    modalComponent={
                                        <div className="reviewItems">
                                            <div className='reviewItems-header'>
                                                <div className='avgStarRating-numReviews-modal'>
                                                    <div id="avgStarRating"><img id="review-star-modal" src={star} alt="" />{avgSpotRating.toFixed(2)}</div>
                                                    <div id='review-period'>•</div>
                                                    <div id="numReviews">{spotReviewsArr.length} review(s)</div>
                                                </div>
                                            </div>
                                            {reviewItems}
                                        </div>}
                                    buttonText={`Show all ${spotReviewsArr.length} reviews`}
                                />
                            </div>

                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className='no-reviews-container'>
                        <div className='no-reviews-header'>
                            <h2 className="no-reviews">There are no reviews yet!</h2>
                            {user?.id !== spot?.ownerId && <div className='no-create-review-modal-button'>
                                <img className='review-icon' src="https://cdn-icons-png.flaticon.com/512/2983/2983706.png" alt="review-icon" />
                                <OpenModalButton
                                    className="create-review-modal"
                                    modalComponent={user ? <CreateReview /> : <LoginFormModal />}
                                    buttonText="Create a review"
                                />
                            </div>
                            }
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

export default SpotReviews;
