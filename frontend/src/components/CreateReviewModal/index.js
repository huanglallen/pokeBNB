import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MakeReview } from "../../store/reviews";
import "./CreateReviewModal.css";

const CreateReviewForm = ({ spotId }) => {
  const dispatch = useDispatch();
  const emptyStar = <i className="fa-thin fa-star"></i>;
  const filledStar = <i className="fa-solid fa-star"></i>;
  const [activeRating, setActiveRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const userId = useSelector((state) => state.session.user.id);

  const handleStarEnter = (rating) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleStarClick = (rating) => {
    setActiveRating(rating);
  };

  const handleSubmitReview = () => {
    // Create the review object based on the active rating and review text
    const review = {
      userId: userId,
      spotId: spotId,
      review: reviewText,
      stars: activeRating,
    };

    // Dispatch the MakeReview thunk
    dispatch(MakeReview(spotId, review));
  };

  const isReviewTextValid = reviewText.length >= 10;

  return (
    <div className="ReviewModalForm">
      <h2 className="ReviewModalHead">How was your stay?</h2>
      <input
        type="text"
        placeholder="Leave your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <div className="ratingStars">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div
            key={rating}
            className={`star ${rating <= (hoveredRating || activeRating) ? "filled" : "empty"}`}
            onMouseEnter={() => handleStarEnter(rating)}
            onMouseLeave={handleStarLeave}
            onClick={() => handleStarClick(rating)}
          >
            {rating <= (hoveredRating || activeRating) ? filledStar : emptyStar}
          </div>
        ))}
      </div>
      <button className="submitReviewButton" onClick={handleSubmitReview} disabled={!isReviewTextValid}>
        Submit
      </button>
    </div>
  );
};

export default CreateReviewForm;
