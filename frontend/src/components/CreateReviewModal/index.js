import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeReview } from "../../store/reviews";
import "./CreateReviewModal.css";

const CreateReviewForm = ({ spotId }) => {
  const dispatch = useDispatch();
  const emptyStar = <i className="fa-regular fa-star"></i>;
  const filledStar = <i className="fa-solid fa-star"></i>;
  const [activeRating, setActiveRating] = useState(0);
  const [clickedRating, setClickedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    setActiveRating(clickedRating)
  }, [clickedRating])


  const handleStarEnter = (rating) => {
    setActiveRating(rating);
  };

  const handleStarLeave = () => {
    setActiveRating(clickedRating)
  };

  const handleStarClick = (rating) => {
    setClickedRating(rating);
  };

  const handleSubmitReview = () => {
    // Create the review object based on the active rating and review text
    const review = {
      userId: userId,
      spotId: spotId,
      review: reviewText,
      stars: clickedRating,
    };

    dispatch(makeReview(spotId, review));
  };

  return (
    <div className="ReviewModalForm">
      <h2 className="ReviewModalHead">How was your stay?</h2>
      <input
        type="text"
        placeholder="Leave your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <div className="rating-input">
        <div
        className=''
        onMouseEnter={() => handleStarEnter(1)}
        onMouseLeave={handleStarLeave}
        onClick={() => handleStarClick(1)}
        >
          {activeRating >= 1 ? filledStar : emptyStar}
        </div>
        <div
        className=''
        onMouseEnter={() => handleStarEnter(2)}
        onMouseLeave={handleStarLeave}
        onClick={() => handleStarClick(2)}
        >
          {activeRating >= 2 ? filledStar : emptyStar}
        </div>
        <div
        className=''
        onMouseEnter={() => handleStarEnter(3)}
        onMouseLeave={handleStarLeave}
        onClick={() => handleStarClick(3)}
        >
          {activeRating >= 3 ? filledStar : emptyStar}
        </div>
        <div
        className=''
        onMouseEnter={() => handleStarEnter(4)}
        onMouseLeave={handleStarLeave}
        onClick={() => handleStarClick(4)}
        >
          {activeRating >= 4 ? filledStar : emptyStar}
        </div>
        <div
        className=''
        onMouseEnter={() => handleStarEnter(5)}
        onMouseLeave={handleStarLeave}
        onClick={() => handleStarClick(5)}
        >
          {activeRating >= 5 ? filledStar : emptyStar}
        </div>
      </div>
      <button className="submitReviewButton" onClick={handleSubmitReview} disabled={!(reviewText.length >= 10)}>
        Submit Your Review
      </button>
    </div>
  );
};

export default CreateReviewForm;
