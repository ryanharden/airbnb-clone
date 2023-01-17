import { csrfFetch } from "./csrf";

// Constant Action Variables

const LOAD_SPOTS = "spots/loadSpots";

const LOAD_SPOT = "/spots/loadSpot";

// Action Creators

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
};

const loadSpot = (spot) => {
    return {
        type: LOAD_SPOT,
        spot
    }
}
// Thunk Action Creators

export const getSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots");

    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots));
        return spots;
    }
};

export const getSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spot = await res.json();
        dispatch(loadSpot(spot));
        return spot;
    }
}

// Initial State

const initialState = {
    allSpots: {},
    singleSpot: {}
}

// Reducer

export default function spotReducer(state = initialState, action) {
    let newState;
    switch(action.type) {

        // Get All Spots
        case LOAD_SPOTS:
            newState = { allSpots: {}, singleSpot: {} };
            action.spots.Spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            });
            return newState;
            
        // Get details of Spot by Id
        case LOAD_SPOT:
            newState = { ...state, singleSpot: {} };
            newState.singleSpot = action.spot;
            return newState;

        default:
            return state;
    }
};
