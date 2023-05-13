import SpotIndexItem from "../SpotIndexItem/SpotIndexItem";
import { fetchSpots } from "../../store/spots";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from "react-router-dom";

//looks at session.user's spots from profileButton tab
const ManageSpots = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id);
    const allSpots = useSelector(state => state.spots.allSpots);
    const spots = Object.values(allSpots).filter(spot => spot.ownerId === userId);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <>
        <h2>Manage Your Spots</h2>
        <Link to='/spots/new' className="create">Create a new Spot</Link>
        <section>
            <ul>
                {spots.map(spot => (
                    <>
                    <SpotIndexItem spot={spot} key={spot.id} />
                    </>
                ))}
            </ul>
        </section>
        </>
    )
}

export default ManageSpots;
