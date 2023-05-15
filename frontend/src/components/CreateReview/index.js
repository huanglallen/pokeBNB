import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MakeReview } from "../../store/reviews";

const CreateReviewForm = ({ spotId }) => {
  const dispatch = useDispatch();
  const emptyStar = <i className="fa-thin fa-star"></i>;
  const filledStar = <i className="fa-solid fa-star"></i>;
  const [activeRating, setActiveRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const userId = useSelector((state) => state.session.user.id);

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

  return (
    <div className="ReviewForm">
      <h2>How was your stay?</h2>
      <input
        type="text"
        placeholder="Leave your review here"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <div className="ratings">
        <input
          type="button"
          onMouseEnter={() => setActiveRating(1)}
          onClick={() => handleStarClick(1)}
          value={1 <= activeRating ? filledStar : emptyStar}
        />
        <input
          type="button"
          onMouseEnter={() => setActiveRating(2)}
          onClick={() => handleStarClick(2)}
          value={2 <= activeRating ? filledStar : emptyStar}
        />
        <input
          type="button"
          onMouseEnter={() => setActiveRating(3)}
          onClick={() => handleStarClick(3)}
          value={3 <= activeRating ? filledStar : emptyStar}
        />
        <input
          type="button"
          onMouseEnter={() => setActiveRating(4)}
          onClick={() => handleStarClick(4)}
          value={4 <= activeRating ? filledStar : emptyStar}
        />
        <input
          type="button"
          onMouseEnter={() => setActiveRating(5)}
          onClick={() => handleStarClick(5)}
          value={5 <= activeRating ? filledStar : emptyStar}
        />
      </div>
      <button onClick={handleSubmitReview}>Submit</button>
    </div>
  );
};

export default CreateReviewForm;

