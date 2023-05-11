import SpotForm from "../SpotForm/SpotForm";

const CreateSpotForm = () => {
    const spot = {
        spot: ''
    }
    return (
        <SpotForm spot={spot} formType="Create Spot"/>
    )
}

export default CreateSpotForm;
