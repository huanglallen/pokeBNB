import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
export const UPDATE_SPOT = 'spots/UPDATE_SPOT';
export const REMOVE_SPOT = 'spots/REMOVE_SPOT';

export const loadSpots = spots => ({
    type: LOAD_SPOTS,
    spots
});

export const receiveSpot = spot => ({
    type: RECEIVE_SPOT,
    spot
});

export const updateSpot = spot => ({
    type: UPDATE_SPOT,
    spot
});

export const removeSpot = spotId => ({
    type: REMOVE_SPOT,
    spotId
});

export const fetchSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    if(response.ok) {
        const data = await response.json();
        // console.log('dataThunk', data)
        dispatch(loadSpots(data));
    };
};

export const getSpot = (spotId) => async dispatch => {
    // console.log('getSpotTHUNK_spotId', spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if(response.ok) {
        const data = await response.json();
        dispatch(receiveSpot(data))
    }
}

export const createSpot = (spot, spotImages) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot)
    });
    if (response.ok) {
        const createNewSpot = await response.json();
        createNewSpot.spotImages = [];
        for(let i = 0; i < spotImages.length; i++) {
            const imgRes = await csrfFetch(`/api/spots/${createNewSpot.id}/images`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  url: spotImages[i],
                  preview: true
                })
            });
            if (imgRes.ok) {
                const newImage = await imgRes.json();
                createNewSpot.spotImages.push(newImage)
            }
        }
    dispatch(receiveSpot(createNewSpot));
    return createNewSpot;
    }
};

export const editSpot = spot => async dispatch => {
    // console.log('editspotthunk', spot)
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    if(response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    };
};

export const deleteSpot = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if(response.ok) {
        dispatch(removeSpot(spotId));
    };
};

const initialState = {
    allSpots:{},
    singleSpot: {}
};
const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS:
            const spotsState = {
                ...state,
                allSpots: {},
                singleSpot: {}
            };
            action.spots.Spots.forEach(spot => {
                spotsState.allSpots[spot.id] = spot;
            });
            return spotsState;
        case RECEIVE_SPOT:
            return { ...state, singleSpot: action.spot };
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: action.spot };
        default:
            return state;
    }
}

export default spotsReducer;
