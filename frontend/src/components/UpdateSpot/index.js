import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./UpdateSpot.css";

import SpotForm from "../SpotForm";
import { getSpot } from '../../store/spots';

const UpdateSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);

    useEffect(() => {
        dispatch(getSpot(spotId));
    }, [dispatch, spotId]);

    if(!spot || !spotId) return;

    return (
        Object.keys(spot).length > 1 && (
            <div className="updateSpotForm">
                <h2 className='updateHead'>Update your Spot</h2>
                <SpotForm spot={spot} formType="Update Spot" />
            </div>
        )
    )
}

export default UpdateSpot;
