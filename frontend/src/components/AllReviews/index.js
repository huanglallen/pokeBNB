import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../store/reviews";
import './AllReviews.css';

const AllReviews = ({ spotId }) => {
    const dispatch = useDispatch();
    const singleSpotId = useSelector(state => state.spots.singleSpot.id)
    const reviews = useSelector(state => {
        const filteredReviews = Object.values(state.reviews.spot).filter(review => review.reviewData.spotId === singleSpotId);
        return filteredReviews;
    });

    useEffect(() => {
        dispatch(getReviews(spotId));
    }, [dispatch, spotId]);

    const getDate = (updatedAt) => {
        const date = new Date(updatedAt);
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    if(!reviews) return null;
    // const filteredReviews = Object.values(reviews)

    return (
        <div className="allReviews">
        {reviews.map((review) => (
            <div className="reviewWrapper" key={review.reviewData.id}>
                <h3 className="reviewName">{review.User.userData.firstName}</h3>
                <h4 className="date">{getDate(review.reviewData.updatedAt)}</h4>
                <p className="description">{review.reviewData.review}</p>
            </div>
        ))}
        </div>
    );
};

export default AllReviews;
