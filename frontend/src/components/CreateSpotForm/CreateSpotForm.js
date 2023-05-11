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
        <>
            <SpotForm spot={spot} formType="Create Spot"/>
        </>
    )
}

export default CreateSpotForm;
