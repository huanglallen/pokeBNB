import React from 'react';
import './SpotDeleteModal.css';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';

const SpotDeleteModal = ({ spot, setShowDeleteModal }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSpot(spot.id));
    setShowDeleteModal(false);
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
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

