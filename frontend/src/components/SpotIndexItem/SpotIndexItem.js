import { Link, useLocation } from "react-router-dom";
import { useDispatch,  useSelector } from "react-redux";
import { deleteSpot } from "../../store/spots";

const SpotIndexItem = ({ spot }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const rating = spot.avgRating;
    const spotImg = spot.previewImage;
    const currentUser = useSelector(state => state.session.user);
    // console.log('SpotIndex_currentUser', currentUser)
    const handleDelete = e => {
        e.preventDefault();
        dispatch(deleteSpot(spot.id))
    }

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
                {currentUser && location.pathname === "/spots/current" &&currentUser.id === spot.ownerId && (
                    <div className="spotButtons">
                    <Link exact to={`/spots/${spot.id}/edit`} className="update">Update</Link>
                    <button className="delete" onClick={handleDelete}>Delete</button>
                </div>
                )}
            </div>
        </li>
    )
}

export default SpotIndexItem;
