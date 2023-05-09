import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem/SpotIndexItem';

const SpotIndex = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotsObj)
    // console.log('spotsIndex', spots)

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <section>
            <ul>
                {spots.map(spot => (
                    <SpotIndexItem spot={spot} key={spot.id} />
                ))}
            </ul>
        </section>
    )
}

export default SpotIndex;
