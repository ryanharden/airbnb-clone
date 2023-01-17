import "./allSpots.css";
import star from "../../assets/star.png";
import { Link } from "react-router-dom";

const SpotIndexItem = ({ spot }) => {
    return (
        <div className="spot-index-item">
            <Link className="show-spot-index-item" to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt={spot.name} className="spot-preview-image" />
                <div className="spot-location-rating">
                    <span id="title">{spot.city}, {spot.state}</span>
                    <span id="rating"><img id="star" src={star} alt="" />{spot.avgRating}</span>
                </div>
                <div id="price"><span className="dollars">${spot.price} </span><span className="night">night</span></div>
            </Link>
        </div>
    )
}

export default SpotIndexItem;
