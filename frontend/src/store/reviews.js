import { csrfFetch } from "./csrf";

// Constant Action Variables

const LOAD_SPOT_REVIEWS = "/reviews/loadSpotReviews";

const LOAD_USER_REVIEWS = "/reviews/loadUserReviews";

const CREATE_REVIEW = "/reviews/createReview";

const DELETE_REVIEW = "/reviews/deleteReview";

// Action Creators

const loadSpotReviews = (reviews) => {
    return {
        type: LOAD_SPOT_REVIEWS,
        reviews
    }
};

const loadUserReviews = (userReviews) => {
    return {
        type: LOAD_USER_REVIEWS,
        userReviews
    }
};

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
};

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
};

// Thunk Action Creators

// GET SPOT REVIEWS
export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
        const data = await res.json();
        const reviews = data.Reviews;
        dispatch(loadSpotReviews(reviews));
        return reviews;
    }
};

// GET USER REVIEWS
export const getUserReviewsThunk = () => async (dispatch) => {
    const res = await csrfFetch("/api/reviews/current");

    if (res.ok) {
        const data = await res.json();
        const reviews = data.Reviews;
        dispatch(loadUserReviews(reviews))
        return reviews;
    }
};

// CREATE REVIEW
export const createReviewThunk = (spotId, newReview, reviewDetails) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview)
    });

    if (res.ok) {
        const data = await res.json();
        const review = {...data, ...reviewDetails};
        dispatch(createReview(review));
        return review
    }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const deletedReview = await res.json();
        dispatch(deleteReview(reviewId));
        return deletedReview
    }
};

// Initial State

const initialState = {
    spot: {},
    user: {}
};

// Reducer

export default function reviewReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {

        // Get Spot Reviews
        case LOAD_SPOT_REVIEWS:
            newState = { spot: {}, user: {} };
            action.reviews.forEach(review => {
                newState.spot[review.id] = review
            });
            return newState;

        // Get User Reviews
        case LOAD_USER_REVIEWS:
            newState = {...state, user: {} };
            action.userReviews.forEach(review => {
                newState.user[review.id] = review
            });
            return newState;

        // Create Review
        case CREATE_REVIEW:
            newState.spot = { ...state.spot, [action.review.id]: action.review}
            return newState
            // return {
            //     ...state,
            //     spot: {
            //         ...state.spot,
            //         [action.review.id]: action.review
            //     }
            // };

        // Delete Review
        case DELETE_REVIEW:
            newState.spot = {...state.spot}
            delete newState.spot[action.reviewId]
            return newState

        // Default
        default:
            return state;
    };
};
