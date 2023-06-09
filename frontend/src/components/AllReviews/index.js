import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../store/reviews";
import ReviewDeleteModal from "../ReviewDeleteModal";
import { useModal } from "../../context/Modal";
import './AllReviews.css';

const AllReviews = ({ spotId }) => {
    const dispatch = useDispatch();
    const singleSpotId = useSelector(state => state.spots.singleSpot.id);
    const currentUserId = useSelector(state => state.session.user.id);
    const reviews = useSelector((state) => {
        const filteredReviews = Object.values(state.reviews.spot)
            .filter((review) => review.reviewData.spotId === singleSpotId)
            .sort((a, b) => new Date(b.reviewData.updatedAt) - new Date(a.reviewData.updatedAt));
        return filteredReviews;
    });

    const getDate = (updatedAt) => {
        const date = new Date(updatedAt);
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    useEffect(() => {
        dispatch(getReviews(spotId));
    }, [dispatch, spotId]);

    //modal items
    const { setModalContent } = useModal();
    const openDeleteReviewModal = (reviewId) => {
        setModalContent(<ReviewDeleteModal reviewId={reviewId} />)
    }

    if(!reviews) return null;

    return (
        <div className="allReviews">
        {reviews.map((review) => (
            <div
            className="reviewWrapper"
            key={review.reviewData.id}
            >
                <h3 className="reviewName">{review.User.userData.firstName}</h3>
                <h4 className="date">{getDate(review.reviewData.updatedAt)}</h4>
                <p className="description">{review.reviewData.review}</p>
                {currentUserId && currentUserId === review.reviewData.userId && (
                    <div>
                        <button
                        className="DeleteReviewButton"
                        onClick={() => openDeleteReviewModal(review.reviewData.id)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        ))}
        </div>
    );
};

export default AllReviews;
