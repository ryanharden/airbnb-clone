import "./SpotsIndexItem.css";
import star from "../../assets/star.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SpotIndexItem = ({ spot }) => {

    // const rating = parseFloat(spot.avgRating) ? parseFloat(spot.avgRating).toFixed(2) : "N/A";
    // // const spot = useSelector(state => state.Spots.singleSpot);
    // // console.log(spot);

    // const spotReviews = useSelector(state => state.Reviews.spot);
    // // console.log(spotReviews);

    // const spotReviewsArr = Object.values(spotReviews);
    // // console.log(spotReviewsArr)

    // // const user = useSelector(state => state.session.user);

    return (
        <div className="spot-index-item">
            <Link className="show-spot-index-item" to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt={spot.name} className="spot-preview-image" />
                <div className="spot-location-rating">
                    <span id="title">{spot.city}, {spot.state}</span>
                    <span id="rating"><svg className={"main-star-spot-item"} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height='12px' width='12px' ><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd"></path></svg>
                        {spot.avgRating.toFixed(2)}</span>
                </div>
                <span id="spot-item-category">{spot.category}</span>
                <div id="price"><span className="dollars">${spot.price} </span><span className="night">night</span></div>
            </Link>
        </div>
    )
}

export default SpotIndexItem;
