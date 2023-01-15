import "./allSpots.css";

const SpotCard = ({spot}) => {
    return (
        <div className="spot-card">
            <img src={spot.previewImage} alt={spot.name} className="spot-preview-image" />
            <div className="spot-info">
                <p>{spot.city}, {spot.state}</p>
                <p>${spot.price} night</p>
            </div>
        </div>
    )
}

export default SpotCard;
