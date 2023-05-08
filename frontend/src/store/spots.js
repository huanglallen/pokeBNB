import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';

export const loadSpots = spots => ({
    type: LOAD_SPOTS,
    spots
});

export const receiveSpot = spot => ({
    type: RECEIVE_SPOT,
    spot
})

export const fetchSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');
    if(res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots));
    };
};

const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_SPOTS:
            const spotsState = {};
            action.spots.forEach(spot => {
                spotsState[spot.id] = spot;
            });
            return spotsState;
        case RECEIVE_SPOT:
            return { ...state, [action.spot.id]: action.spot };
        default:
            return state;
    }
}

export default spotsReducer;
