import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const SpotIndexItem = ({ spot }) => {
    // const dispatch = useDispatch();
    const rating = spot.avgRating;
    const spotImg = spot.previewImage;

    if(!spotImg) return;

    return (
        <li>
            <div className="spot">
                <Link to={`/spots/${spot.id}`}>
                        <div className="img">
                            <img
                                className="spotImg"
                                src={spotImg}
                                alt={`${spot.name}`}
                            />
                        </div>
                        <div className="spotLocation">
                            {spot.city}, {spot.state}
                        </div>
                        <div className="spotRating">
                            <i className="fa-solid fa-star"></i>
                            {rating ? rating : 'New'}
                        </div>
                        <div className="spotPrice">
                            ${spot.price} night
                        </div>
                </Link>
            </div>
        </li>
    )
}

export default SpotIndexItem;
