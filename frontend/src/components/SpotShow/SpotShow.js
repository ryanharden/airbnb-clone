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

    console.log(spot);
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
            </div>
            <div className='single-spot-bottom-left'>
                <div className='single-spot-header'>
                    {spot.Owner && (
                        <div className='hosted-by'>Entire home hosted by {spot.Owner.firstName}</div>
                    )}
                    <div className='guest-room-details'>
                        <div className="room-det">{spot.guests} {spot.guests > 1 ? " guests" : " guest"}</div>
                        <div className='bed-dot'>·</div>
                        <div className="room-det">{spot.bedrooms} {spot.bedrooms > 1 ? ' bedrooms' : ' bedroom'}</div>
                        <div className='bed-dot'>·</div>
                        <div className="room-det">{spot.beds} {spot.beds > 1 ? 'beds' : 'bed'}</div>
                        <div className='bed-dot'>·</div>
                        <div className="room-det">{spot.bathrooms} {spot.bathrooms > 1 ? 'baths' : 'bath'}</div>
                    </div>
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
                    <div className='spot-description'>
                        {spot.description}
                    </div>
                    <div className='where-sleep-container'>
                        <div className='where-sleep-header'>
                            Where you'll sleep
                        </div>
                        <div className='show-sleep-box-container'>
                            <div className='sleep-box-content'>
                                <svg className="bed-svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height='24px' width='24px'><path d="M26 4a2 2 0 0 1 1.995 1.85L28 6v7.839l1.846 5.537a3 3 0 0 1 .115.468l.03.24.009.24V30h-2v-2H4v2H2v-9.675a3 3 0 0 1 .087-.717l.067-.232L4 13.836V6a2 2 0 0 1 1.697-1.977l.154-.018L6 4zm2 18H4v4h24zm-1.388-6H5.387l-1.333 4h23.891zM26 6H6v8h2v-4a2 2 0 0 1 1.85-1.995L10 8h12a2 2 0 0 1 1.995 1.85L24 10v4h2zm-11 4h-5v4h5zm7 0h-5v4h5z"></path></svg>
                                <div className='bed-area'>Bedroom area</div>
                                <div className='spot-beds-queen'>{spot.beds} queen-size beds</div>
                            </div>
                        </div>
                    </div>
                    <div className='place-offers-container'>
                        <div className='place-offers-header'>
                            What this place offers
                        </div>
                        <div className='place-offers-content'>

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
        </div>
    )
}

export default SpotShow;
