import { useEffect, useState } from 'react';
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
import SpotAmenities from '../SpotAmenities/SpotAmenities';
import profPic from "../../assets/prof-pic.jpeg";
import BookingBox from '../BookingBox/BookingBox';
import { getBookingsForSpotThunk } from '../../store/bookings';
import "./SpotShow.css";


let lunar = false;

if (new Date().getFullYear() % 4 === 0) lunar = true;
const maxMonthDays = {
    0: 31,
    1: lunar ? 29 : 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.Spots.singleSpot);
    const dispatch = useDispatch();

    // console.log(spot);
    const user = useSelector(state => state.session.user);
    // console.log("user: ", user);
    const spotReviews = useSelector(state => state.Reviews.spot);
    // console.log(spotReviews);

    const spotReviewsArr = Object.values(spotReviews);

    const allBookings = useSelector(state => state.Bookings.bookingsBySpot);
    const spotBookings = allBookings[spotId] || {};
    const spotBookingsArr = Object.values(spotBookings);

    // console.log("spotBookingsArr: ", spotBookingsArr)
    // console.log("spotBookings: ", spotBookings);

    // const [shake, setShake] = useState(false);
    const [resSuccess1, setResSuccess1] = useState(false);
    const [resSuccess2, setResSuccess2] = useState(false);
    const [resSuccess3, setResSuccess3] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    // const [reviewModal, setReviewModal] = useState(false);
    const [numDays, setNumDays] = useState(3);
    const [endMonth, setEndMonth] = useState(startDate.getMonth());
    const [endDay, setEndDay] = useState(startDate.getDate() + numDays);
    const [startingDay, setStartingday] = useState(startDate.getDate());
    const [endYear, setEndYear] = useState(startDate.getFullYear());
    const dayOverage = (startingDay + numDays) % maxMonthDays[startDate.getMonth()];

    const [endDate, setEndDate] = useState(new Date(startDate.getFullYear(), endMonth, endDay));
    // const [value, onChange] = useState([startDate, endDate]);


    function parseDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    function padNumber(number) {
        return number.toString().padStart(2, '0');
    }

    const reservedDates = [];

    if (spotBookingsArr.length) {
        spotBookingsArr.forEach((booking) => {
            // console.log("booking: ", booking);
            let start = parseDate(booking.startDate);
            let end = parseDate(booking.endDate);
            while (start <= end) {
                reservedDates.push(`${start.getFullYear()}-${padNumber(start.getMonth() + 1)}-${padNumber(start.getDate())}`);
                start.setDate(start.getDate() + 1);
            }
        });
    }
    // console.log("reservedDates: ", reservedDates);


    useEffect(() => {
        dispatch(getSpotThunk(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getBookingsForSpotThunk(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        if (dayOverage < startDate.getDate()) {
            if (endMonth === 12) {
                setEndYear(startDate.getFullYear() + 1);
                setEndMonth(1);
                setEndDay(dayOverage);
            } else {
                setEndMonth(startDate.getMonth() + 1);
                setEndDay(dayOverage);
            }
        } else {
            setEndDay(startDate.getDate() + numDays);
            setStartDate(new Date(`${startDate.getFullYear()}/${startDate.getMonth() + 1}/${startDate.getDate()}`));
        }
    }, [])

    if (!Object.values(spot).length) return null;

    let sumOfReviewAverages = 0;
    if (spotReviewsArr.length > 0) {
        spotReviewsArr.forEach((review) => {
            let reviewAverage = (
                review.cleanliness +
                review.accuracy +
                review.communication +
                review.location +
                review.checkin +
                review.value
            ) / 6;

            sumOfReviewAverages += reviewAverage;
        });
    }

    let avgSpotRating = 0;
    if (spotReviewsArr.length > 0) {
        avgSpotRating = sumOfReviewAverages / spotReviewsArr.length;
    }

    return (
        <div className='spot-show-page'>
            <div className='spot-header'>
                <h1 className='spot-name'>{spot?.name}</h1>
                <div className='details-edit-spot'>
                    <div className="avgStarRating-numReviews-location">
                        <div id="avgStarRating"><svg className={"main-star"} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height={"14px"} width={"14px"} fill="#222222" display={"inline-block"}>
                            <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd"></path>
                        </svg>{avgSpotRating.toFixed(2)}</div>
                        <div id='period'>•</div>
                        <a className='show-reviews-link' href="#numReviewsBig">
                            <div id="numReviews">{spotReviewsArr.length} {spotReviewsArr.length === 1 ? 'review' : 'reviews'}</div>
                        </a>
                        <div id='period'>•</div>
                        <div id="city-state-country">{spot?.city}, {spot?.state}, {spot?.country}</div>
                    </div>
                    {user?.id == spot?.ownerId &&
                        <div className='edit-delete-actions'>
                            <div className='edit-spot-button'>
                                <i className="fa-regular fa-pen-to-square"></i>
                                <OpenModalButton
                                    className="edit-spot-modal-button"
                                    modalComponent={<EditSpotForm />}
                                    buttonText="Edit Nest"
                                />
                            </div>
                            <div className='delete-spot-button'>
                                <i className="fa-solid fa-trash-can"></i>
                                <OpenModalButton
                                    className="delete-spot-modal-button"
                                    modalComponent={<DeleteSpotForm />}
                                    buttonText="Delete Nest"
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
            <div className='single-spot-bottom'>
                <div className='single-spot-bottom-left'>
                    <div className='single-spot-header'>
                        <div className='spot-header-left'>
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
                        <div className='spot-header-right'>
                            <img className="prof-pic-hosted" src={profPic} alt="" />
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
                            <SpotAmenities spot={spot} />
                        </div>
                        <div className='aircover'>
                            <img className='aircover-image' src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt='aircover' />
                            <h4 className='aircover-description'>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</h4>
                        </div>
                    </div>
                </div>
                <div className='single-spot-bottom-right'>
                    <BookingBox spot={spot}
                        padNumber={padNumber}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        numDays={numDays}
                        setNumDays={setNumDays}
                        reviews={spotReviewsArr}
                        spotBookings={spotBookings}
                        avgSpotRating={avgSpotRating}
                        reservedDates={reservedDates}
                        user={user}
                    />
                </div>
            </div>
            <div className='spot-reviews'>
                <SpotReviews />
            </div>
        </div>
    )
}

export default SpotShow;
