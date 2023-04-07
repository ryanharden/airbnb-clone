
import { csrfFetch } from "./csrf";

// Constant Action Variables

const LOAD_SPOTS = "/spots/loadSpots";

const LOAD_SPOT = "/spots/loadSpot";

const CREATE_SPOT = "/spots/addSpot";

const UPDATE_SPOT = "/spots/updateSpot";

const DELETE_SPOT = "/spots/deleteSpot";

const DELETE_IMAGE = "spots/DELETE_IMAGE";
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

const createSpot = (spot, spotImages) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const updateSpot = (spot, spotImages) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const deleteImage = (imageId) => ({
    type: DELETE_IMAGE,
    imageId
})

// Thunk Action Creators

// Get Spots
export const getSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots");

    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots));
        return spots;
    }
};

// Get Spot
export const getSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spot = await res.json();
        dispatch(loadSpot(spot));
        return spot;
    }
};

// Create Spot
export const createSpotThunk = (newSpotData, images) => async (dispatch) => {
    const res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newSpotData)
    });
    if (res.ok) {
        const newSpot = await res.json();
        // console.log("newSpot :", newSpot)

        const formData = new FormData();
        for (let image of images) {
            formData.append("images", image);
        }

        const addImages = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: "POST",
            headers: {"Content-Type": "multipart/form-data"},
            body: formData
        });

        if (addImages.ok) {
            const images = await addImages.json();
            dispatch(createSpot(newSpot, images));
            return newSpot;
        }
    };
};

// Edit Spot
export const updateSpotThunk = (editedSpot, spotDetails) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotDetails.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedSpot)
    });
    console.log("editedSpotStore: ", editedSpot);

    if (res.ok) {
        const updatedSpot = await res.json();
        console.log("updatedSpotStore: ", updateSpot);
        const formData = new FormData();
        for (let image of spotDetails.SpotImages) {
            formData.append("images", image);
        }

        const addImages = await csrfFetch(`/api/spots/${spotDetails.id}/images`, {
            method: "POST",
            headers: {"Content-Type": "multipart/form-data"},
            body: formData
        });

        if (addImages.ok) {
            const images = await addImages.json();
            const actualSpot = {...updatedSpot, ...editedSpot, ...spotDetails}
            console.log("actualSpot: ", actualSpot);
            dispatch(updateSpot(actualSpot, images));
            return actualSpot;
        }
    };
};

// Delete Spot
export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const deletedSpot = await res.json();
        dispatch(deleteSpot(spotId))
        return deletedSpot
    }
};

// Delete Spot Image
export const deleteImageThunk = (imageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/images/${imageId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(deleteImage(imageId));
    } else {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}

// Initial State
const initialState = {
    allSpots: {},
    singleSpot: {}
};

// Reducer
export default function spotReducer(state = initialState, action) {
    let newState = {...state}
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
        return { ...state, singleSpot: action.spot }

        // Create Spot
        case CREATE_SPOT:
            newState.allSpots = {...state.allSpots, [action.spot.id]: action.spot}
            return newState;

        // Edit Spot
        case UPDATE_SPOT:
            return {...state, singleSpot: action.spot}

        case DELETE_SPOT:
            newState.allSpots = {...state.allSpots}
            delete newState.allSpots[action.spotId];
            return newState

        // Default
        default:
            return state;
    }
};
