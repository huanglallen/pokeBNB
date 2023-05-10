import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSpot } from "../../store/spots";

const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);

    useEffect(() => {
        dispatch(getSpot(spotId));
    }, [dispatch, spotId]);
    return (
        <>
        <h2>{spot.name}</h2>
        <h3>
            {spot.city}, {spot.state}, {spot.country}
        </h3>
        <div className="showImgs">
            <div className="prevImg">
                {spot.previewImage}
            </div>
            <div className="otherImgs">

            </div>
        </div>
        <div className="info">
            <div className="spotContext">
                <h2>Hosted by </h2>
            </div>
        </div>
        </>
    )
}

export default SpotShow;
