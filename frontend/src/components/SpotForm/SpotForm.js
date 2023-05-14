import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './SpotForm.css'
import { createSpot, editSpot } from "../../store/spots";

//form used by CreateSpot and UpdateSpot
const SpotForm = ({ spot, formType}) => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const [country, setCountry] = useState(spot?.country);
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [description, setDescription] = useState(spot?.description);
    const [name, setName] = useState(spot?.name);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImg] = useState(spot?.previewImage);
    const [img1, setImg1] = useState(spot?.img1);
    const [img2, setImg2] = useState(spot?.img2);
    const [img3, setImg3] = useState(spot?.img3);
    const [img4, setImg4] = useState(spot?.img4);
    const ownerId = useSelector(state => state.session.user.id);

    const formErrors = {};
    useEffect(() => {
        if(submitted) {
            if (!country) formErrors.country = 'Country is required';
            if (!address) formErrors.address = 'Address is required';
            if (!city) formErrors.city = 'City is required';
            if (!state) formErrors.state = 'State is required';
            if (!description || description.length <= 30) formErrors.description = 'Description needs a minimum of 30 characters';
            if (!name) formErrors.name = 'Name is required';
            if (!price) formErrors.price = 'Price is required';
            if (!previewImage) formErrors.previewImage = 'Preview image is required';
            if (img1 && !img1.endsWith('.jpg') && !img1.endsWith('.jpeg') && !img1.endsWith('.png')) formErrors.img1 = 'Image URL must end in .png, .jpg, or .jpeg';
            if (img2 && !img2.endsWith('.jpg') && !img2.endsWith('.jpeg') && !img2.endsWith('.png')) formErrors.img2 = 'Image URL must end in .png, .jpg, or .jpeg';
            if (img3 && !img3.endsWith('.jpg') && !img3.endsWith('.jpeg') && !img3.endsWith('.png')) formErrors.img3 = 'Image URL must end in .png, .jpg, or .jpeg';
            if (img4 && !img4.endsWith('.jpg') && !img4.endsWith('.jpeg') && !img4.endsWith('.png')) formErrors.img4 = 'Image URL must end in .png, .jpg, or .jpeg';

            setErrors(formErrors);
        }

    }, [country, address, city, state, description, name, price, previewImage, img1, img2, img3, img4, submitted]);

    const onSubmit = async(e) => {
        e.preventDefault();
        setSubmitted(true);

        //fill according to backend post req
        spot = { ...spot, ownerId, country, address, city, state, description, name, price, lat: 1, lng: 1}

        const spotImages = [
            previewImage,
            img1,
            img2,
            img3,
            img4
        ]

        if(formType === "Create Spot") {
            const newSpot = await dispatch(createSpot(spot, spotImages));
            spot = newSpot;
        }
        if(formType === "Update Spot") {
            const changeSpot = await dispatch(editSpot(spot));
            spot = changeSpot;
        }

        if (Object.keys(errors).length > 0) {
            setErrors(spot.errors);
        } else {
            history.push(`/spots/${spot.id}`);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h3>Where's your place located?</h3>
            <p>
                Guests will only get your exact address once they booked a reservation
            </p>
            <div className="countryText">Country {errors.country && <span className="error-message">{errors.country}</span>}</div>
                <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}/>
            <div className="address">Street address {errors.address && <span className="error-message">{errors.address}</span>}</div>
                <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}/>
            <div className="cityState">
                <div className="city">City {errors.city && <span className="error-message">{errors.city}</span>}</div>
                <div className="state">State {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
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
                <div className="descriptionErr">{errors.description && <span className="error-message">{errors.description}</span>}</div>
            </div>
            <div className="name">
                <h3>Create a title for your spot</h3>
                <p>Catch guests attention with a spot title that highlights what makes your place special</p>
                <input
                type="text"
                placeholder="Name of your spot"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
                {errors.name && <span className="nameErr error-message">{errors.name}</span>}
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
                    <div className="priceErr">{errors.price && <span className="error-message">{errors.price}</span>}</div>
                </div>
            </div>
            {location.pathname === "/spots/new" && (
                <div className="image">
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>

                    <input
                    type="text"
                    placeholder="Preview Image URL"
                    value={previewImage}
                    onChange={(e) => setPreviewImg(e.target.value)}/>
                    <div className="pImgErr">{errors.previewImage && <span className="error-message">{errors.previewImage}</span>}</div>

                    <input
                    type="text"
                    placeholder="Image URL"
                    value={img1}
                    onChange={(e) => setImg1(e.target.value)}/>
                    <div className="img1Err">{errors.img1 && <span className="error-message">{errors.img1}</span>}</div>

                    <input
                    type="text"
                    placeholder="Image URL"
                    value={img2}
                    onChange={(e) => setImg2(e.target.value)}/>
                    <div className="img2Err">{errors.img2 && <span className="error-message">{errors.img2}</span>}</div>

                    <input
                    type="text"
                    placeholder="Image URL"
                    value={img3}
                    onChange={(e) => setImg3(e.target.value)}/>
                    <div className="img3Err">{errors.img3 && <span className="error-message">{errors.img3}</span>}</div>

                    <input
                    type="text"
                    placeholder="Image URL"
                    value={img4}
                    onChange={(e) => setImg4(e.target.value)}/>
                    <div className="img4Err">{errors.img4 && <span className="error-message">{errors.img4}</span>}</div>
                </div>
            )}
            <button className="submitButton" type="submit">{formType}</button>
        </form>
    )
}

export default SpotForm;
