import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotThunk } from '../../store/spots';
import star from "../../assets/star.png";
import "./allSpots.css";

const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.Spots.singleSpot);
    const dispatch = useDispatch();
    const history = useHistory();
    // const spotImagesArr = spot.SpotImages;



    useEffect(() => {
        dispatch(getSpotThunk(spotId))
        .catch(() => history.push("/"))
    }, [dispatch, spotId])

    if (!spot) return null;

    return (
        <div>
            <div className='spot-header'>
                <h1 className='spot-name'>{spot.name}</h1>
                <div className="avgStarRating-numReviews-location">
                <span id="avgStarRating"><img id="star" src={star} alt="" />{spot.avgStarRating}</span>
                <span id="numReviews">{spot.numReviews}</span>
                <span id="city-state-country">{spot.city}, {spot.state}, {spot.country}</span>
                </div>
            </div>
            {/* <div className='spot-images'>
                <img className='spot-main-image' src={spot.SpotImages[0].url} alt="not-found" />
                <div className="spot-other-images">
                    <img className="spot-other-image" src={spot.SpotImagesArr[1].url} alt="not-found" />
                    <img className="spot-other-image" src={spot.SpotImages[2].url} alt="" />
                    <img className="spot-other-image" src={spot.SpotImages[3].url} alt="" />
                    <img className="spot-other-image" src={spot.SpotImages[4].url} alt="" />
                </div>
            </div> */}
        </div>
    )
}

export default SpotShow;
