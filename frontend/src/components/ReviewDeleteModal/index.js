import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";

import "./ReviewDeleteModal.css";

const ReviewDeleteModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteAction = reviewId => {
        dispatch(deleteReview(reviewId));
        window.location.reload();
        return
    }

    return (
        <div className="ReviewDeleteWrapper">
            <h1 className="ReviewDeleteHead">
                Confirm Delete
            </h1>
            <button
            className="confirmReviewDelete"
            onClick={() => deleteAction(reviewId)}
            >
                Yes (Delete Review)
            </button>
            <button
            className="cancelReviewDelete"
            onClick={() => closeModal()}
            >
                No (Keep Review)
            </button>
        </div>
    )
};


export default ReviewDeleteModal;
