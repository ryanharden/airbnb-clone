import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotThunk } from '../../store/spots';
import { OpenModalButton } from "../OpenModalButton";
import star from "../../assets/star.png";
import "./SpotShow.css";

const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.Spots.singleSpot[spotId]);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
            .catch(() => history.push("/"))
    }, [dispatch, spotId, history])

    if (!spot) return null;

    return (
        <div>
            <div className='spot-show-page'>
                <div className='spot-header'>
                    <h1 className='spot-name'>{spot.name}</h1>
                    <div className="avgStarRating-numReviews-location">
                        <div id="avgStarRating"><img id="star" src={star} alt="" />{spot.avgStarRating}</div>
                        <div id='period'>.</div>
                        {/* <OpenModalButton
                    modalComponent={}
                    buttonText={spot.numReviews} review(s)
                /> */}
                        <div id="numReviews">{spot.numReviews} review(s)</div>
                        <div id='period'>.</div>
                        <div id="city-state-country">{spot.city}, {spot.state}, {spot.country}</div>
                    </div>
                </div>
                <div className='spot-images-container'>
                    <div className='main-image-container'>
                    <img src={spot.SpotImages[0].url} alt="" />
                    </div>
                    <div className="other-images-container">
                        <img src={spot.SpotImages[1].url} alt="" />
                        <img id="image-3" src={spot.SpotImages[2].url} alt="" />
                        <img src={spot.SpotImages[3].url} alt="" />
                        <img id="image-5" src={spot.SpotImages[4].url} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotShow;
