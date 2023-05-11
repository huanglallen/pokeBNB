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
    const response = await csrfFetch('/api/spots');
    if(response.ok) {
        const data = await response.json();
        // console.log('dataThunk', data)
        dispatch(loadSpots(data));
    };
};

export const getSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if(response.ok) {
        const data = await response.json();
        // console.log('data', data)
        dispatch(receiveSpot(data))
    }
}

export const createSpot = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(receiveSpot(data));
    }
  };

const initialState = {
    allSpots:{},
     singleSpot: {}
};
const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS:
            const spotsState = {
                allSpots:{},
                singleSpot: {}
            };
            // console.log('actionState', action)
            action.spots.Spots.forEach(spot => {
                spotsState.allSpots[spot.id] = spot;
            });
            // console.log('spotsStateNext', spotsState)
            return spotsState;
        case RECEIVE_SPOT:
            console.log('actiontest', action)
            return { ...state, singleSpot: action.spot };
        default:
            return state;
    }
}

export default spotsReducer;
