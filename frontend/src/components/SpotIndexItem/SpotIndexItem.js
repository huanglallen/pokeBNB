import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const SpotIndexItem = ({ spot }) => {
    const dispatch = useDispatch();
    // console.log(spot)
    return (
        <li>
            <div className="spot">
                <Link to={`/spots/${spot.id}`}>
                    {spot.city}, {spot.state}
                </Link>
            </div>
        </li>
    )
}

export default SpotIndexItem;
