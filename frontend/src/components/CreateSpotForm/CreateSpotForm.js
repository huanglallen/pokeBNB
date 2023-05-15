import SpotForm from "../SpotForm/SpotForm";
import "./CreateSpotForm.css";

const CreateSpotForm = () => {
    const spot = {
        country: '',
        street: '',
        city: '',
        state: '',
        description: '',
        name: '',
        price: '',
        previewImage: '',
        img1: '',
        img2: '',
        img3: '',
        img4: ''
    }
    return (
        <div className="createSpotForm">
            <h2 className="formHead">Create a new Spot</h2>
            <SpotForm spot={spot} formType="Create Spot"/>
        </div>
    )
}

export default CreateSpotForm;
