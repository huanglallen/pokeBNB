import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSpot } from "../../store/spots";

const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    // console.log('spotshow_spotId', spotId)
    const spot = useSelector(state => state.spots.singleSpot);
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
    }, [dispatch, spotId]);

    if(!spot) return;
    if(!spot.SpotImages) return;

    return (
        <>
        <h2>{spot.name}</h2>
        <h3>
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
                <h2>Hosted by {spot.Owner && `${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                <p>{spot.description}</p>
            </div>
            <div className="reserve">
                <div className="reserveInfo">
                    {`$${spot.price} night`}
                    <div className="reviewInfo">
                    <i className="fa-solid fa-star"/>
                    {spot.avgStarRating} . {spot.numReviews} reviews
                    </div>
                </div>
            </div>
        </div>
        <div className="reviewSection">
            <h2>
                <i className="fa-solid fa-star"/>
                {spot.avgStarRating} . {spot.numReviews} reviews
            </h2>
        </div>
        </>
    )
}

export default SpotShow;
