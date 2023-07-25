import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem';
import './SpotIndex.css'

//displays all spots into homepage
const SpotIndex = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotsObj)

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <section className='SpotIndex'>
            <ul className="IndexWrapper">
                {spots.map(spot => (
                    <SpotIndexItem spot={spot} key={spot.id} />
                ))}
            </ul>
        </section>
    )
}

export default SpotIndex;
