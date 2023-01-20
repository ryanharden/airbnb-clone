import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/reviews';
import SpotReviewsIndexItem from "../SpotReviewsIndexItem/SpotReviewsIndexItem";
import star from "../../assets/star.png";
import "./SpotReviews.css";

const SpotReviews = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams;

    const spot = useSelector(state => state.Spots.singleSpot);
    console.log(spot);

    const spotReviews = useSelector(state => state.Reviews.spot);
    console.log(spotReviews);
    const spotReviewsArr = Object.values(spotReviews);

    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId))
    }, [dispatch, spotId]);

    if (!spotReviewsArr.length) return null;

    const reviewItems = spotReviewsArr.map((review) => {
        return <SpotReviewsIndexItem key={review.id} review={review} spot={spot} />
    });

    return (
        <>
            <div className='spot-reviews-container'>
                <div className='spot-reviews-header'>
                    <div className='avgStarRating-numReviews'>
                        <div id="avgStarRating"><img id="star" src={star} alt="" />{spot.avgStarRating}</div>
                        <div id='period'>.</div>
                        <div id="numReviews">{spot.numReviews} review(s)</div>
                    </div>
                </div>
                <div className='spot-reviews-item-container'>
                    <ul className='reviews-wrapper'>
                        {reviewItems}
                    </ul>
                </div>
            </div>
        </>
    )
};

export default SpotReviews;
