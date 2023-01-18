import { csrfFetch } from "./csrf";

// Constant Action Variables

const LOAD_SPOTS = "spots/loadSpots";

const LOAD_SPOT = "/spots/loadSpot";

const CREATE_SPOT = "/spots/addSpot";

// const UPDATE_SPOT = "/spots/updateSpot";

// const DELETE_SPOT = "/spots/deleteSpot";

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

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

// const updateSpot = (spot) => {
//     type: UPDATE_SPOT;
//     spot
// }

// const deleteSpot = (spotId) => {
//     type: DELETE_SPOT;
//     spotId
// }


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

export const createSpotThunk = (spot, url) => async (dispatch) => {
    const res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(spot)
    });

    if (res.ok) {
        const newSpot = await res.json();
        const newSpotImage = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url , preview: true})
        });

        if (newSpotImage.ok) {
            const spotImageData = await newSpotImage.json();
            newSpot.previewImage = spotImageData.url;
        }

        dispatch(createSpot(newSpot));
        return newSpot;
    };

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
        return { ...state, singleSpot:{ ...state.singleSpot, [action.spot.id]: action.spot }}

        // Create Spot
        case CREATE_SPOT:
            newState = { allSpots: {}, singleSpot: {} };
            newState.allSpots[action.spot.id] = action.spot
            return newState;

        default:
            return state;
    }
};
