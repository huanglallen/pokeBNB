import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
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

  const handleDelete = (e) => {
    e.preventDefault();
    setModalContent(
      <SpotDeleteModal spot={spot}
      handleDeleteConfirmation={handleDeleteConfirmation}
      />
      );
    };

    const handleDeleteConfirmation = () => {
      dispatch(deleteSpot(spot.id));
      closeModal();
    };


    if (!spot || !spotImg) return null;

  return (
    <li>
      <div className="spot">
        <Link to={`/spots/${spot.id}`}>
          <div className="img">
            <img className="spotImg" src={spotImg} alt={`${spot.name}`} />
            <div className="nametext">
              <p className="text">{spot.name}</p>
            </div>
          </div>
          <div className="firstRow">
            <div className="spotLocation">
              {spot.city}, {spot.state}
            </div>
            <div className="spotRating">
              <i className="fa-solid fa-star"></i>
              <div className="ratingNum">
                {rating ? rating.toFixed(1) : "New"}
              </div>
            </div>
          </div>
          <div className="spotPrice">
            <div className="priceNum">${spot.price}</div>
            <div className="night">night</div>
          </div>

        {currentUser &&
          location.pathname === "/spots/current" &&
          currentUser.id === spot.ownerId && (
            <div className="spotButtons">
              <Link to={`/spots/${spot.id}/edit`} className="updateButton">
                Update
              </Link>
              <button className="deleteButton" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}

        </Link>
      </div>
    </li>
  );
};

export default SpotIndexItem;
