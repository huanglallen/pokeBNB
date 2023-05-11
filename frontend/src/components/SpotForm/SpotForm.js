import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createSpot } from "../../store/spots";

const SpotForm = ({ spot, formType}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [country, setCountry] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        setErrors({});
        if(formType === "Create Spot") {
            const newSpot = await dispatch(createSpot(spot))
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <h2>Create a new Spot</h2>
            <h3>Where's your place located?</h3>
            <p>
                Guests will only get your exact address once they booked a reservation
            </p>
            <div className="countryText">Country {errors.country}</div>
            <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}>Country</input>
        </form>
    )
}

export default SpotForm;
