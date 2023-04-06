
import { csrfFetch } from "./csrf";

// Constant Action Variables

const LOAD_SPOTS = "/spots/loadSpots";

const LOAD_SPOT = "/spots/loadSpot";

const CREATE_SPOT = "/spots/addSpot";

const UPDATE_SPOT = "/spots/updateSpot";

const DELETE_SPOT = "/spots/deleteSpot";

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

const createSpot = (spot, spotImage) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const updateSpot = (spot) => {
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
    // const {name, address, city, state, country, lat = 32.7157, lng = 117.1611, description, price, url } = spot
    console.log("store-images: ", images);
    const res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newSpotData)
    });
    // console.log("newSpotData :", newSpotData)

    if (res.ok) {
        const newSpot = await res.json();
        console.log("newSpot :", newSpot)

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

// export const createSpotThunk = (newSpotData, previewImage) => async (dispatch) => {
//     // const {name, address, city, state, country, lat = 32.7157, lng = 117.1611, description, price, url } = spot
//     const res = await csrfFetch("/api/spots", {
//         method: "POST",
//         headers: { "Content-Type": "application/json"},
//         body: JSON.stringify(newSpotData)
//     });
//     // console.log("newSpotData :", newSpotData)

//     if (res.ok) {
//         const newSpot = await res.json();
//         // console.log("newSpot :", newSpot)

//         const res2 = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ url: previewImage , preview: true})
//         });

//         if (res2.ok) {
//             // console.log("newSpotImage :", newSpotImage)
//             const newSpotImage = await res2.json();
//             // console.log("newSpotImage :", newSpotImage)
//             newSpot.previewImage = newSpotImage.url
//             // newSpot.SpotImages = [newSpotImage]
//             // console.log("newSpot :", newSpot)
//             dispatch(createSpot(newSpot));
//             return newSpot;
//         }
//     };
// };

// Edit Spot
export const updateSpotThunk = (editedSpot, spotDetails) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotDetails.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedSpot)
    });

    if (res.ok) {
        const updatedSpot = await res.json();
        const actualSpot = {...updatedSpot, ...spotDetails}
        dispatch(updateSpot(actualSpot));
        return updatedSpot;
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
