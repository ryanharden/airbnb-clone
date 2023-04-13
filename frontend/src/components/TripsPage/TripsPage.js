import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TripsPage.css'
import { useNavigate } from 'react-router-dom';
import { deleteBookingThunk, getUserBookingsThunk } from '../../store/bookings';
import { getSpotsThunk } from '../../store/spots';
import SpotIndexItem from '../SpotsIndexItem/SpotIndexItem';
import OpenModalButton from '../OpenModalButton';
import EditBookingBox from '../EditBookingBox/EditBookingBox';
import calendar from "../../assets/calendar-edit.png";
import FilterBar from '../FilterBar/FilterBar';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const TripsPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const today = new Date();
    // let photo = null;
    const [updated, setUpdated] = useState(false);
    const bookings = useSelector(state => state.Bookings.allBookings);
    const allSpots = useSelector((state) => state.Spots.allSpots);
    const allSpotsArr = Object.values(allSpots);
    const bookingsArr = Object.values(bookings);
    console.log("bookingsArr: ", bookingsArr);

    const first6Spots = allSpotsArr.slice(0, 6);

    const spotRecs = first6Spots.map((spot) => {
        return <SpotIndexItem key={spot.id} spot={spot} />
    });

    useEffect(() => {
        dispatch(getSpotsThunk())
        dispatch(getUserBookingsThunk());
    }, [dispatch, updated])


    const BookingItem = ({ booking, spot }) => {
        const { startDate, endDate, guests } = booking;
        // console.log("booking-start: ", booking.startDate);
        console.log("spot: ", spot);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const formatStartDate = new Date(startDateObj.getUTCFullYear(), startDateObj.getUTCMonth(), startDateObj.getUTCDate());
        const formatEndDate = new Date(endDateObj.getUTCFullYear(), endDateObj.getUTCMonth(), endDateObj.getUTCDate());

        const numDays = (Math.ceil((formatEndDate.getTime() - formatStartDate.getTime()) / 1000 / 60 / 60 / 24));
        const updatedTotal = spot?.price * numDays + parseInt(spot?.price * numDays * 0.12) + parseInt(spot?.price * numDays * 0.08);

        let countDown = '';
        if (formatStartDate.getTime() > today.getTime()) {
            countDown =
                `Trip is coming up in ${Math.ceil((formatStartDate.getTime() - (today).getTime()) / 1000 / 24 / 60 / 60)} days!`
        } else if (formatEndDate.getTime() < today.getTime()) {
            countDown = 'Trip complete'
        } else {
            countDown = 'Trip in progress'
        }

        const handleDelete = (e) => {
            e.preventDefault();
            dispatch(deleteBookingThunk(booking.id))
            navigate("/bookings/current");
        }

        return (
            <div
                className='booking-item'>
                <img onClick={() => navigate(`/spots/${spot?.id}`)} className='booking-image' src={spot?.previewImage} alt="loading" />
                <div className='booking-info'>
                    <div className='booking-info-top'>
                        <div onClick={() => navigate(`/spots/${spot?.id}`)} className='booking-name'>{spot?.name}</div>
                        <div className='booking-dates'>
                            <h3>{`${monthNames[formatStartDate.getMonth()]} ${formatStartDate.getDate()}, ${formatStartDate.getFullYear()} - ${monthNames[formatEndDate.getMonth()]} ${formatEndDate.getDate()}, ${formatEndDate.getFullYear()}`}</h3>
                            <div className='booking-period'>•</div>
                            <h3>{`${numDays} ${numDays === 1 ? "night" : "nights"}`}</h3>
                        </div>
                        <div className='booking-details'>{`${guests} ${guests === 1 ? 'guest' : 'guests'} · `} Total: ${updatedTotal}</div>
                    </div>
                    <div className='booking-trip'>
                        {countDown}
                    </div>
                </div>
                {countDown.startsWith('Trip is coming up') && (
                    <div className='edit-delete-booking'>
                        <div className='edit-booking'>
                            <OpenModalButton
                                className="edit-booking-button"
                                modalComponent={<EditBookingBox key={booking.id} spot={spot} booking={booking} setUpdated={setUpdated} />}
                                buttonText={<img src={calendar} className="calendar-edit" />}
                            />
                        </div>
                        <div className='delete-booking'>
                            <i onClick={handleDelete} id="booking-trash" className="fa-solid fa-trash-can fa-lg"></i>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    const bookingItems = bookingsArr.map((booking) => {
        const spot = allSpots[booking.spotId];
        return <BookingItem key={booking.id} booking={booking} spot={spot} />
    });

    if (!bookingsArr.length)
        return (
            <div className='trips-page-container'>
                <div className='trips-page-header'>
                    No trips are booked yet!
                </div>
                <div className='no-bookings-header'>
                    Recommended nests for you
                </div>
                <div className='spot-recs-container'>
                    <ul className="spots-wrapper">
                        {spotRecs}
                    </ul>
                </div>
            </div>
        )
    return (
        <div className='trips-page-container'>
            <div className='trips-page-header'>
                Trips
            </div>
            {bookingItems}
        </div>
    )
}

export default TripsPage;
