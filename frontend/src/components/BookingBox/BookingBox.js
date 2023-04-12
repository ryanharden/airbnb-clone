import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './BookingBox.css';
import { createBookingThunk } from '../../store/bookings';
import OpenModalButton from '../OpenModalButton';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import BookingModal from '../BookingModal/BookingModal';
import LoginFormModal from '../LoginFormModal';

const BookingBox = ({ spot, startDate, setStartDate, endDate, setEndDate, numDays, setNumDays, padNumber, avgSpotRating, reviews, reservedDates }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const [guests, setGuests] = useState(1);
    const [datesReserved, setDatesReserved] = useState(false);
    const [shake, setShake] = useState(false);
    const [total, setTotal] = useState(spot.price * numDays + parseInt(spot.price * numDays * 0.12) + parseInt(spot.price * numDays * 0.08));
    const temp = new Date();
    const today = new Date(temp.setHours(0, 0, 0, 0));
    const { setModalContent, closeModal } = useModal();
    const spotId = spot.id;

    useEffect(() => {
        setNumDays(Math.floor(((endDate.getTime() - (new Date(startDate.setHours(0, 0, 0, 0))).getTime()) / 1000 / 60 / 60 / 24) < 0 ? 0 : ((endDate.getTime() - (new Date(startDate.setHours(0, 0, 0, 0))).getTime()) / 1000 / 60 / 60 / 24)));
    }, [startDate, endDate])

    useEffect(() => {
        setTotal(spot.price * numDays + parseInt(spot.price * numDays * 0.12) + parseInt(spot.price * numDays * 0.08));
    }, [numDays])

    useEffect(() => {
        let tempDate = new Date(startDate);
        setDatesReserved(false);
        while (tempDate <= endDate) {
            if (isDateReserved(tempDate)) {
                setDatesReserved(true);
                break;
            }
            tempDate.setDate(tempDate.getDate() + 1);
        }
    }, [startDate, endDate, reservedDates]);

    const isDateReserved = (date) => {
        const formattedDate = `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
        return reservedDates.includes(formattedDate);
    };

    const handleStartChange = (e) => {
        const startValue = e.target.value;
        const startYear = parseInt(startValue.split('-')[0])
        const startMonth = parseInt(startValue.split('-')[1])
        const startDay = parseInt(startValue.split('-')[2])
        setStartDate(new Date(`${startYear}, ${startMonth}, ${startDay}`))
    }
    const handleEndChange = (e) => {
        const endValue = e.target.value;
        const endYear = endValue.split('-')[0]
        const endMonth = endValue.split('-')[1]
        const endDay = endValue.split('-')[2]

        setEndDate(new Date(`${endYear}, ${endMonth}, ${endDay}`))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setModalContent(<LoginFormModal />);
            return;
        }

        if (numDays === 0 || datesReserved || user.id == spot.ownerId) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, 300);
            return true;
        } else {
            const booking = await dispatch(
                createBookingThunk({
                    startDate,
                    endDate,
                    spotId,
                    guests,
                    total: spot.price * numDays + parseInt(spot.price * numDays * 0.12) + parseInt(spot.price * numDays * 0.08),
                    days: numDays,
                })
            );
            if (booking) {
                setModalContent(<BookingModal onSuccess={() => navigate("/bookings/current")} />);
            }
            return false;
        }
    };

    return (
        <div className='spot-floating-panel'>
            <div className='floating-box-border'>
                <div className='floating-box-top'>
                    <div className='floating-box-price-review'>
                        <div className='floating-box-price'>
                            ${spot.price} <span id='floating-price-night'> night</span>
                        </div>
                        <div className='floating-box-right-header'>
                            <div className='floating-box-avgRating'>
                                <div id="avgStarRating-floating"><svg className={"main-star"} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height={"12px"} width={"12px"} fill="#222222" display={"inline-block"}>
                                    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd"></path>
                                </svg>{avgSpotRating.toFixed(2)}</div>
                            </div>
                            <div id='period-floating'>•</div>
                            <div className='floating-box-review'>
                                <a className='float-box-tag' href="#numReviewsBig">
                                    {reviews.length === 1 ? '1 review' : `${reviews.length} reviews`}
                                </a>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='floating-box-form-top'>
                            <div className='floating-dates'>
                                <span className='floatbox-guests-span'>CHECK-IN</span>
                                <input onKeyDown={(e) => e.preventDefault()}
                                    className='floating-start-date'
                                    type="date"
                                    value={`${startDate.getFullYear()}-${(startDate.getMonth() + 1) < 10 ? `0${(startDate.getMonth() + 1)}` : (startDate.getMonth() + 1)}-${startDate.getDate() > 9 ? '' : '0'}${startDate.getDate()}`}
                                    onChange={handleStartChange}
                                    min={(today.toISOString().split('T')[0])}
                                // min='2023-01-05'
                                />
                                <span className='floatbox-guests-span float-checkout'>CHECKOUT</span>
                                <input onKeyDown={(e) => e.preventDefault()}
                                    className='floating-end-date'
                                    type="date"
                                    value={`${endDate.getFullYear()}-${(endDate.getMonth() + 1) < 10 ? `0${(endDate.getMonth() + 1)}` : (endDate.getMonth() + 1)}-${endDate.getDate() > 9 ? '' : '0'}${endDate.getDate()}`}
                                    onChange={handleEndChange}
                                    min={`${startDate.getFullYear()}-${(startDate.getMonth() + 1) < 10 ? `0${(startDate.getMonth() + 1)}` : (startDate.getMonth() + 1)}-${startDate.getDate() > 9 ? '' : '0'}${startDate.getDate()}`}
                                />
                            </div>
                        </div>
                        <span className='floatbox-guests-span'>GUESTS</span>
                        <select value={guests} onChange={(e) => (setGuests(e.target.value))} className='floating-box-guests' >
                            {[...Array(spot.guests).keys()].map((_, index) => {
                                const numGuests = index + 1;
                                return (
                                    <option key={numGuests} value={numGuests}>
                                        {numGuests} guest{numGuests > 1 ? 's' : ''}
                                    </option>
                                );
                            })}
                        </select>
                        {user?.id == spot.ownerId ?
                            <button onClick={handleSubmit} id={shake ? "shake" : ""} className='floating-box-button'>Cant Reserve Own Spot</button> :
                            <OpenModalButton
                                onButtonClick={handleSubmit}
                                className='floating-box-button'
                                shake={shake}
                                modalComponent={<BookingModal />}
                                buttonText={datesReserved ? "Dates Already Booked" : "Reserve"}
                                // disabled={datesReserved || numDays === 0}
                            />
                        }
                    </form>
                </div>
                <span className='floating-box-charge'>You won't be charged yet</span>
                <div className='floating-box-bot'>
                    <div className='floating-box-nights'>
                        <div>{spot.price} x {numDays} nights</div>
                        <div>${spot.price * numDays} </div>
                    </div>
                    <div className='floating-box-cleaning'>
                        <div>Cleaning fee</div>
                        <div>${parseInt(spot.price * numDays * 0.08)} </div>
                    </div>
                    <div className='floating-box-service'>
                        <div>Service fee</div>
                        <div>${parseInt(spot.price * numDays * 0.12)}</div>
                    </div>
                </div>
                <div id='float-divider'></div>
                <div className='float-total'>
                    <div>Total before taxes</div>
                    <div>$ {spot.price * numDays + parseInt(spot.price * numDays * 0.12) + parseInt(spot.price * numDays * 0.08)}</div>
                </div>
            </div>
        </div>
    );
}

export default BookingBox;
