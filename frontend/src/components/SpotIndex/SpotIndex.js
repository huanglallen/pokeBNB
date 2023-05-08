import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';

const SpotIndex = () => {
    const dispatch = useDispatch();
    const spots = Object.values(
        useSelector(state => state.spots ? state.spots : [])
    );

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <section>
            <ul>
                {spots.map(spot => {
                    <li spot={spot} key={spot.id}>{spot}</li>
                })}
            </ul>
        </section>
    )
}

export default SpotIndex;
