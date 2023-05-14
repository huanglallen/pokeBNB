import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

export const loadReviews = reviews => ({
    type: LOAD_REVIEWS,
    reviews
});

export const createReview = review => ({
    type: CREATE_REVIEW,
    review
});

export const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
});

const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS:
            const reviewsState = {
                spot: {},
                user: {}
            };
        default:
            return state;

    }
};

export default reviewsReducer;
