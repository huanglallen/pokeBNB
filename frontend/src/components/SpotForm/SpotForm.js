import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './SpotForm.css'
import { createSpot, editSpot } from "../../store/spots";

//form used by CreateSpot and UpdateSpot
const SpotForm = ({ spot, formType}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [country, setCountry] = useState(spot?.country);
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [description, setDescription] = useState(spot?.description);
    const [name, setName] = useState(spot?.name);
    const [price, setPrice] = useState(spot?.price);
    const [previewImg, setPreviewImg] = useState(spot?.previewImg);
    const [img1, setImg1] = useState(spot?.img1);
    const [img2, setImg2] = useState(spot?.img2);
    const [img3, setImg3] = useState(spot?.img3);
    const [img4, setImg4] = useState(spot?.img4);
    const ownerId = useSelector(state => state.session.user.id);

    const onSubmit = async(e) => {
        e.preventDefault();
        setErrors({});

        //fill according to backend post req
        spot = { ...spot, ownerId, country, address, city, state, description, name, price, lat: 1, lng: 1}

        if(formType === "Create Spot") {
            const newSpot = await dispatch(createSpot(spot));
            spot = newSpot;
        }
        if(formType === "Update Spot") {
            const changeSpot = await dispatch(editSpot(spot));
            spot = changeSpot;
        }

        if (spot.errors) {
            setErrors(spot.errors);
        } else {
            console.log('historypush', spot)
            history.push(`/spots/${spot.id}`);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h3>Where's your place located?</h3>
            <p>
                Guests will only get your exact address once they booked a reservation
            </p>
            <div className="countryText">Country {errors.country}</div>
                <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}/>
            <div className="address">Street address {errors.address}</div>
                <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}/>
            <div className="cityState">
                <div className="city">City {errors.city}</div>
                <div className="state">State {errors.state}</div>
            </div>
            <div className="cityStateInputs">
                <div className="cityInput">
                    <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}/>
                </div>
                <div className="stateInput">
                    <input
                    type="text"
                    placeholder="STATE"
                    value={state}
                    onChange={(e) => setState(e.target.value)}/>
                </div>
            </div>
            <div className="description">
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <input
                type="text"
                placeholder="Please write at least 30 characters"
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
                <div className="descriptionErr">{errors.description}</div>
            </div>
            <div className="name">
                <h3>Create a title for your spot</h3>
                <p>Catch guests attention with a spot title that highlights what makes your place special</p>
                <input
                type="text"
                placeholder="Name of your spot"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
                <div className="nameErr">{errors.name}</div>
            </div>
            <div className="price">
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out rank higher in search results.</p>
                <div className="priceInput">
                    $ <input
                    type="text"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}/>
                    <div className="priceErr">{errors.price}</div>
                </div>
            </div>
            <div className="image">
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>

                <input
                type="text"
                placeholder="Preview Image URL"
                value={previewImg}
                onChange={(e) => setPreviewImg(e.target.value)}/>
                <div className="pImgErr"></div>

                <input
                type="text"
                placeholder="Image URL"
                value={img1}
                onChange={(e) => setImg1(e.target.value)}/>
                <div className="img1Err"></div>

                <input
                type="text"
                placeholder="Image URL"
                value={img2}
                onChange={(e) => setImg2(e.target.value)}/>
                <div className="img2Err"></div>

                <input
                type="text"
                placeholder="Image URL"
                value={img3}
                onChange={(e) => setImg3(e.target.value)}/>
                <div className="img3Err"></div>

                <input
                type="text"
                placeholder="Image URL"
                value={img4}
                onChange={(e) => setImg4(e.target.value)}/>
                <div className="img4Err"></div>
            </div>
            <button className="submitButton" type="submit">{formType}</button>
        </form>
    )
}

export default SpotForm;
