import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createSpot } from "../../store/spots";

const SpotForm = ({ spot, formType}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [country, setCountry] = useState(spot?.country);
    const [street, setStreet] = useState(spot?.street);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [description, setDescription] = useState(description?.state);
    const [name, setName] = useState(spot?.name);
    const [price, setPrice] = useState(spot?.price);
    console.log(formType)

    const onSubmit = async e => {
        e.preventDefault();
        setErrors({});

        spot = { ...spot, country }

        if(formType === "Create Spot") {
            const newSpot = await dispatch(createSpot(spot));
            spot = newSpot;
        }

        if (spot.errors) {
            setErrors(spot.errors);
          } else {
            history.push(`/spots/${spot.id}`);
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
            <div className="street">Street address {errors.address}</div>
            <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}>Address</input>
            <div className="cityState">
                <div className="city">
                    City {errors.city}
                </div>
                <div className="state">
                    State {errors.state}
                </div>
            </div>
            <div className="cityStateInputs">
                <div className="cityInput">
                    <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>City</input>
                </div>
                <div className="stateInput">
                    <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}>State</input>
                </div>
            </div>
            <div className="description">
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}>Description</input>
                <div className="descriptionErr">{errors.description}</div>
            </div>
            <div className="name">
                <h3>Create a title for your spot</h3>
                <p>Catch guests attention with a spot title that highlights what makes your place special</p>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}>Name of your spot</input>
                <div className="nameErr">{errors.name}</div>
            </div>
            <div className="price">
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out rank higher in search results.</p>
                <div className="priceInput">
                    $ <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}>Price per night (USD)</input>
                    <div className="priceErr">{errors.price}</div>
                </div>
            </div>
            <div className="image">
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
            </div>
        </form>
    )
}

export default SpotForm;
