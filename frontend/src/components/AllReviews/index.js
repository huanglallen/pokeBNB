import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../store/reviews";

const AllReviews = ({ spotId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.user);

  useEffect(() => {
    dispatch(getReviews(spotId));
  }, [dispatch, spotId]);

  const getDate = (updatedAt) => {
    const date = new Date(updatedAt);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="allReviews">
      {Object.values(reviews).map((review) => (
        <div className="review" key={review.reviewData.id}>
          <h3 className="reviewName">{review.User.userData.firstName}</h3>
          <h4 className="date">{getDate(review.reviewData.updatedAt)}</h4>
          <p className="description">{review.reviewData.review}</p>
        </div>
      ))}
    </div>
  );
};

export default AllReviews;
