import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSpot } from "../../store/spots";
import AllReviews from "../AllReviews";
import { getReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import CreateReviewForm from "../CreateReview";
import './SpotShow.css';

const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    // console.log('spotshow_spotId', spotId)
    const spot = useSelector(state => state.spots.singleSpot);
    const user = useSelector(state => state.session.user);
    const rating = useSelector(state => state.spots.singleSpot.avgStarRating)
    // console.log("SPOTSHOW_REVIEWS", reviews)
    const renderImage = (image) => {
        return (
            <img
            src={image.url}
            alt=''
            />
            );
        };

        useEffect(() => {
            dispatch(getSpot(spotId));
            dispatch(getReviews(spotId));
        }, [dispatch, spotId]);

        //modal items
        const { setModalContent } = useModal();
        const openCreateReviewModal = () => {
            setModalContent(<CreateReviewForm  spotId={spotId}/>);
        };

    if(!spot || !spotId || !spot.SpotImages) return null;

    return (
        <div className="spotShow">
            <h2 className="spotname">{spot.name}</h2>
            <h3 className="location">
                {spot.city}, {spot.state}, {spot.country}
            </h3>
            <div className="showImgs">
                <div className="prevImg">
                    {spot.SpotImages.slice(0, 1).map(renderImage)}
                </div>
                <div className="otherImgs">
                    {spot.SpotImages.slice(1, 5).map(renderImage)}
                </div>
            </div>
            <div className="info">
                <div className="spotContext">
                    <h2 className="host">Hosted by {spot.Owner && `${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                    <p className="spotdescription">{spot.description}</p>
                </div>
                <div className="reserveWrapper">
                    <div className="reserve">
                        <div className="reserveInfo">
                            <div className="resPrice">{`$${spot.price}`}</div>
                            <div className="resNight">night</div>
                        </div>
                        <div className="reviewInfo">
                            <i className="fa-solid fa-star"/>
                            {spot.numReviews && spot.numReviews > 0 ? (
                                <div className="hasReviews">
                                    {Math.round(rating * 10) / 10}
                                    <div className="dot">
                                        <i class="fa-solid fa-circle"></i>
                                    </div>
                                    {spot.numReviews} {spot.numReviews > 1 ? "Reviews" : "Review"}
                                </div>
                            ) : <div className="noReview">New</div> }
                        </div>
                    </div>
                    <button
                    className="resButton"
                    onClick={() => alert("Feature coming soon.")}>
                        Reserve
                    </button>
                </div>
            </div>

            <div className="reviewSection">
                <h2 className="revHead">
                    <div className="resIcon">
                        <i className="fa-solid fa-star"/>
                    </div>
                    {spot.numReviews && spot.numReviews > 0 ? (
                        <div className="hasReviews2">
                            {Math.round(rating * 10) / 10}
                            <div className="resDot">
                                <i class="fa-solid fa-circle"></i>
                            </div>
                            <li className="resNum">
                                {spot.numReviews} {spot.numReviews > 1 ? "Reviews" : "Review"}
                            </li>
                        </div>
                    ) : <div className="noReviews2">New</div>}
                </h2>
                {user && !(user.id === spot.ownerId) && (
                    <div className="PostReviewModal">
                        <button className="RevPostButton" onClick={openCreateReviewModal}>Post Your Review</button>
                    </div>
                )}
                {spot.numReviews === 0 && (
                    <div className="beFirst">
                    Be the first to post a review!
                    </div>
                    )}
            </div>
            <div className="reviews">
                <AllReviews spotId={spotId} />
            </div>
        </div>
    )
}

export default SpotShow;
