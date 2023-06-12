import SpotIndexItem from "../SpotIndexItem/SpotIndexItem";
import { fetchSpots } from "../../store/spots";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './ManageSpots.css';


//looks at session.user's spots from profileButton tab
const ManageSpots = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id);
    const allSpots = useSelector(state => state.spots.allSpots);
    const spots = Object.values(allSpots).filter(spot => spot.ownerId === userId);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    if(!userId) return null;

    return (
        <div className="manageWrapper">
        <h2 className="manageHead">Manage Your Spots</h2>
        {!spots.length && (
            <div className="createSbutton">
            <NavLink exact to='/spots/new'>
                Create a New Spot
                </NavLink>
            </div>
        )}
        <section>
            <ul className="manageSpotsWrapper">
                {spots.map(spot => (
                    <div key={spot.id}>
                    <SpotIndexItem spot={spot} />
                    </div>
                ))}
            </ul>
        </section>
        </div>
    )
}

export default ManageSpots;
