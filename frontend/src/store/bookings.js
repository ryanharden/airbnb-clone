import { csrfFetch } from "./csrf";

// Constant Action Variables
const LOAD_BOOKINGS = "/bookings/loadBookings";
const LOAD_BOOKINGS_FOR_SPOT = "/bookings/loadBookingsForSpot";
const CREATE_BOOKING = "/bookings/addBooking";
const UPDATE_BOOKING = "/bookings/updateBooking";
const DELETE_BOOKING = "/bookings/deleteBooking";

// Action Creators
const loadBookings = (bookings) => {
    return { type: LOAD_BOOKINGS, bookings };
};

const loadBookingsForSpot = (spotId, bookings) => {
    return { type: LOAD_BOOKINGS_FOR_SPOT, spotId, bookings };
};

const createBooking = (booking) => {
    return { type: CREATE_BOOKING, booking };
};

const updateBooking = (booking) => {
    return { type: UPDATE_BOOKING, booking };
};

const deleteBooking = (bookingId) => {
    return { type: DELETE_BOOKING, bookingId };
};

// Thunk Action Creators

// Get all user's bookings
export const getUserBookingsThunk = () => async (dispatch) => {
    const res = await csrfFetch("/api/bookings/current");
    if (res.ok) {
        const bookings = await res.json();
        dispatch(loadBookings(bookings));
        return bookings;
    }
};


// Get All Bookings for a Spot
export const getBookingsForSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
    if (res.ok) {
        const bookings = await res.json();
        dispatch(loadBookingsForSpot(spotId, bookings));
        return bookings;
    }
};

// Create a booking
export const createBookingThunk = (bookingData) => async (dispatch) => {
    const { spotId, startDate, endDate, total, guests } = bookingData;
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate, total, guests }),
    });

    if (res.ok) {
        const newBooking = await res.json();
        dispatch(createBooking(newBooking));
        return newBooking;
    }
};

// Edit a booking
export const updateBookingThunk = (bookingId, bookingData) => async (dispatch) => {
    const { startDate, endDate } = bookingData;
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate }),
    });

    if (res.ok) {
        const updatedBooking = await res.json();
        dispatch(updateBooking(updatedBooking));
        return updatedBooking;
    }
};

// Delete a booking
export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(deleteBooking(bookingId));
    }
};

// Initial State
const initialState = {
    allBookings: {},
    bookingsBySpot: {},
};

// Reducer
export default function bookingReducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_BOOKINGS:
            newState.allBookings = {};
            action.bookings.Bookings.forEach((booking) => {
                newState.allBookings[booking.id] = booking;
            });
            return newState;
        case LOAD_BOOKINGS_FOR_SPOT:
            newState.bookingsBySpot[action.spotId] = {};
            action.bookings.Bookings.forEach((booking) => {
                newState.bookingsBySpot[action.spotId][booking.id] = booking;
            });
            return newState;
        case CREATE_BOOKING:
            newState.allBookings = {
                ...state.allBookings,
                [action.booking.id]: action.booking,
            };
            return newState;
        case UPDATE_BOOKING:
            newState.allBookings = {
                ...state.allBookings,
                [action.booking.id]: action.booking,
            };
            return newState;
        case DELETE_BOOKING:
            newState.allBookings = { ...state.allBookings };
            delete newState.allBookings[action.bookingId];
            return newState;
        default:
            return state;
    }
}
