import './SpotDeleteModal.css';
import { useModal } from '../../context/Modal';

const SpotDeleteModal = ({ spot, handleDeleteConfirmation }) => {
  const { closeModal } = useModal();

  //pressing yes
  const handleDelete = () => {
    handleDeleteConfirmation();
    closeModal();
    window.location.reload();
  };

  //pressing no
  const handleCancel = () => {
    closeModal();
  };

  return (
    <div id="DeleteModalWrapper">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this spot from the listings?</h3>
      <button onClick={handleDelete}>Yes (Delete Spot)</button>
      <button onClick={handleCancel}>No (Keep Spot)</button>
    </div>
  );
};

export default SpotDeleteModal;
