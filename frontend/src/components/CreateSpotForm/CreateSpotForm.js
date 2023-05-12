import SpotForm from "../SpotForm/SpotForm";

const CreateSpotForm = () => {
    const spot = {
        country: '',
        street: '',
        city: '',
        state: '',
        description: '',
        name: '',
        price: '',
        previewImg: '',
        img1: '',
        img2: '',
        img3: '',
        img4: ''
    }
    return (
        <div className="createSpotForm">
            <h2>Create a new Spot</h2>
            <SpotForm spot={spot} formType="Create Spot"/>
        </div>
    )
}

export default CreateSpotForm;
