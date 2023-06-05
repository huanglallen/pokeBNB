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

export const getReviews = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if(response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data));
        return data;
    }
};

export const MakeReview = (spotId, review) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    if(response.ok) {
        const data = await response.json();
        dispatch(createReview(data));
        return data;
    }
};

export const deleteReview = reviewId => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if(response.ok) {
        dispatch(removeReview(reviewId));
    }
};

const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const reviewState = {
                spot: { ...state.spot },
                user: { ...state.user },
            };
            action.reviews.Reviews.forEach((review) => {
                reviewState.spot[review.id] = {
                    reviewData: review,
                    User: {
                    userData: review.User,
                    },
                    ReviewImages: review.ReviewImages,
                };
                reviewState.user[review.id] = {
                    reviewData: review,
                    User: {
                        userData: review.User,
                    },
                    Spot: {
                        spotData: review.Spot,
                    },
                    ReviewImages: review.ReviewImages,
                };
            });
            return reviewState;
        case CREATE_REVIEW:
            const createReviewState = {
                ...state,
                spot: { ...state.spot },
                user: { ...state.user }
            }
            createReviewState.user[action.review.id] = action.review;
            return createReviewState;
        default:
            return state;
    }
};

export default reviewsReducer;
