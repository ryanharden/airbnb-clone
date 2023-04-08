import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TripsPage.css'
import { useNavigate } from 'react-router-dom';
import { deleteBookingThunk, getUserBookingsThunk } from '../../store/bookings';
import { getUserReviewsThunk } from '../../store/reviews';
import { getSpotsThunk } from '../../store/spots';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const TripsPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const today = new Date();
    // let photo = null;

    const bookings = useSelector(state => state.Bookings.allBookings);
    // const spots = useSelector(state => state.Spots.allSpots);
    const bookingsArr = Object.values(bookings);


    useEffect(() => {
        // dispatch(getSpotsThunk())
        dispatch(getUserBookingsThunk());
    }, [dispatch])


    const BookingItem = ({ booking, spot }) => {
        const { startDate, endDate, guests } = booking;
        // console.log("booking-start: ", booking.startDate);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const formatStartDate = new Date(startDateObj.getUTCFullYear(), startDateObj.getUTCMonth(), startDateObj.getUTCDate());
        const formatEndDate = new Date(endDateObj.getUTCFullYear(), endDateObj.getUTCMonth(), endDateObj.getUTCDate());

        const numDays = (Math.ceil((formatEndDate.getTime() - formatStartDate.getTime()) / 1000 / 60 / 60 / 24));

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
        }

        return (
            <div
                onClick={() => navigate(`/spots/${spot.id}`)}
                className='booking-item'>
                {spot && (<img className='booking-image' src={spot?.previewImage} alt="loading" />
                )}
                <div className='booking-info'>
                    <div className='booking-info-top'>
                        <div className='booking-name'>{spot?.name}</div>
                        <div className='booking-dates'>
                            <h3>{`${monthNames[formatStartDate.getMonth()]} ${formatStartDate.getDate()}, ${formatStartDate.getFullYear()} - ${monthNames[formatEndDate.getMonth()]} ${formatEndDate.getDate()}, ${formatEndDate.getFullYear()}`}</h3>
                            <div className='booking-period'>•</div>
                            <h3>{`${numDays} ${numDays === 1 ? "night" : "nights"}`}</h3>
                        </div>
                        <div className='booking-details'>{`${guests} ${guests === 1 ? 'guest' : 'guests'} · `} Total: ${booking.total}</div>
                    </div>
                    <div className='booking-trip'>
                        {countDown}
                    </div>
                </div>
                <div
                    onClick={handleDelete}
                    className='delete-booking'>
                    <i className="fa-solid fa-trash-can fa-2x"></i>
                </div>
            </div>
        )
    }
    const bookingItems = bookingsArr.map((booking) => {
        return <BookingItem key={booking.id} booking={booking} spot={booking.Spot} />
    })

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
