import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteSpot } from "../../store/spots";
import { Modal, useModal } from "../../context/Modal";
import SpotDeleteModal from "../SpotDeleteModal";
import "./SpotIndexItem.css";

const SpotIndexItem = ({ spot }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const rating = spot.avgRating;
  const spotImg = spot.previewImage;
  const currentUser = useSelector((state) => state.session.user);

  //modal variables
  const { setModalContent, closeModal } = useModal();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    setModalContent(
      <SpotDeleteModal spot={spot}
        handleDeleteConfirmation={handleDeleteConfirmation}
      />
    );
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    dispatch(deleteSpot(spot.id));
    setShowDeleteModal(false);
    closeModal();
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    closeModal();
  };

  if (!spotImg) return null;

  return (
    <li>
      <div className="spot">
        <Link to={`/spots/${spot.id}`}>
          <div className="img">
            <img className="spotImg" src={spotImg} alt={`${spot.name}`} />
          </div>
          <div className="spotLocation">
            {spot.city}, {spot.state}
          </div>
          <div className="spotRating">
            <i className="fa-solid fa-star"></i>
            {rating ? rating : "New"}
          </div>
          <div className="spotPrice">${spot.price} night</div>
        </Link>
        {currentUser &&
          location.pathname === "/spots/current" &&
          currentUser.id === spot.ownerId && (
            <div className="spotButtons">
              <Link exact to={`/spots/${spot.id}/edit`} className="update">
                Update
              </Link>
              <button className="delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
      </div>
    </li>
  );
};

export default SpotIndexItem;
