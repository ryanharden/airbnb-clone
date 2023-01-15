import { csrfFetch } from "./csrf";

// Constant Action Variables

const LOAD_SPOTS = "spots/loadSpots";

// Action Creators

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
};

// Thunk Action Creators

export const getSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots");

    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots));
        return spots;
    }
};

// Initial State

const initialState = {
    allSpots: {}
}

// Reducer

export default function spotReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case LOAD_SPOTS: {
            newState = { allSpots: {}};
            action.spots.Spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            });
            return newState;
        }
        default:
            return state;
    }
};
