import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotThunk } from '../../store/spots';
import EditSpotForm from '../EditSpotFormModal/EditSpotForm';
import DeleteSpotForm from '../DeleteSpot/DeleteSpotForm';
import OpenModalButton from '../OpenModalButton';
import SpotReviews from '../SpotReviews/SpotReviews';
import door from "../../assets/icons8-door-48.png";
import pin from "../../assets/icons8-location-pin-64.png";
import calendar from "../../assets/icons8-calendar-64.png";
import star from "../../assets/star.png";
import comingSoon from "../../assets/image_coming_soon.jpeg";
import "./SpotShow.css";

const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.Spots.singleSpot);
    const dispatch = useDispatch();
    // const [avgRating, setAvgRating] = useState(0);
    // const history = useHistory();

    // console.log(spot);
    const user = useSelector(state => state.session.user);

    const spotReviews = useSelector(state => state.Reviews.spot);
    // console.log(spotReviews);

    const spotReviewsArr = Object.values(spotReviews);
    // console.log(spotReviewsArr)

    // console.log(spot);

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
        // .catch(() => history.push("/"))
    }, [dispatch, spotId])


    if (!Object.values(spot).length) return null;

    let avgSpotRating = 0;

    if (spotReviewsArr.length > 0) {
        spotReviewsArr.forEach(review => {
            avgSpotRating += review.stars;
        })
        avgSpotRating = avgSpotRating / spotReviewsArr.length
    }

    return (
        <div className='spot-show-page'>
            <div className='spot-header'>
                <h1 className='spot-name'>{spot.name}</h1>
                <div className='details-edit-spot'>
                    <div className="avgStarRating-numReviews-location">
                        <div id="avgStarRating"><img id="star" src={star} alt="" />{avgSpotRating.toFixed(2)}</div>
                        <div id='period'>•</div>
                        <div id="numReviews">{spotReviewsArr.length} review(s)</div>
                        <div id='period'>•</div>
                        <div id="city-state-country">{spot.city}, {spot.state}, {spot.country}</div>
                    </div>
                    {user?.id == spot.ownerId &&
                        <div className='edit-delete-actions'>
                            <div className='edit-spot-button'>
                                <i className="fa-regular fa-pen-to-square"></i>
                                <OpenModalButton
                                    className="edit-spot-modal-button"
                                    modalComponent={<EditSpotForm />}
                                    buttonText="Edit Spot"
                                />
                            </div>
                            <div className='delete-spot-button'>
                                <i className="fa-solid fa-trash-can"></i>
                                <OpenModalButton
                                    className="delete-spot-modal-button"
                                    modalComponent={<DeleteSpotForm />}
                                    buttonText="Delete Spot"
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='spot-images-container'>
                <div className='main-image-container'>
                    {spot.SpotImages.length > 0 ? <img className="main-image" src={spot.SpotImages[0].url} alt="none" /> : <img className='main-image' src={comingSoon} alt="" />}
                </div>
                <div className="second-col-images-container">
                    {spot.SpotImages.length > 1 ? <img className="other-image" src={spot.SpotImages[1].url} alt="none" /> : <img className='other-image' src={comingSoon} alt="" />}
                    {spot.SpotImages.length > 2 ? <img className="other-image" src={spot.SpotImages[2].url} alt="none" /> : <img className='other-image' src={comingSoon} alt="" />}
                </div>
                <div className='third-col-images-container'>
                    {spot.SpotImages.length > 3 ? <img className="other-image" id="image-3" src={spot.SpotImages[3].url} alt="none" /> : <img className='other-image' src={comingSoon} alt="" />}
                    {spot.SpotImages.length > 4 ? <img className="other-image" id="image-4" src={spot.SpotImages[4].url} alt="none" /> : <img className='other-image' src={comingSoon} alt="" />}
                </div>
                {/* <div className='second-col-images-container'>
                    {spot.SpotImages && (
                        spot.SpotImages.slice(1, 3).map((image, index) => (
                            <img src={image.url} alt={spot.name} key={image.id} className={`image-${index}`} />
                        ))
                    )}
                </div>
                <div className='third-col-images-container'>
                    {spot.SpotImages && (
                        spot.SpotImages.slice(3, 5).map((image, index) => (
                            <img src={image.url} alt={spot.name} key={image.id} className={`image-${index}`} />
                        ))
                    )}
                </div> */}
            </div>
            <div className='single-spot-description'>
                {spot.Owner && (
                    <h2>Entire home hosted by {spot.Owner.firstName}</h2>
                )}
                <p>{spot.description}</p>
            </div>
            <div className='left-spot-description'>
                <div className='more-description'>
                    <div className='detail-title'>
                        <img className="icons-8-door" src={door} alt="" />
                        <div className='title-p'>
                            <h3 className='check-in-title'>Self check-in</h3>
                            <p>Check yourself in with the lockbox.</p>
                        </div>
                    </div>
                    <div className='detail-title'>
                        <img className='pin' src={pin} alt="" />
                        <div className='title-p'>
                            <h3 className='location-title'>Great location</h3>
                            <p>95% of recent guest gave the location a 5-star rating.</p>
                        </div>
                    </div>
                    <div className='detail-title'>
                        <img className='calendar' src={calendar} alt="" />
                        <div className='title-p'>
                            <h3 className='cancellation-title'>Free cancellation for 48 hours.</h3>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className='aircover'>
                    <img className='aircover-image' src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt='aircover' />
                    <h4 className='aircover-description'>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</h4>
                </div>
            </div>
            <div className='spot-reviews'>
                <SpotReviews />
            </div>
        </div>
    )
}

export default SpotShow;
