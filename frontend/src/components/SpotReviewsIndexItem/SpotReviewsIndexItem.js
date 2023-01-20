import "./SpotReviewsIndexItem.css";
import star from "../../assets/star.png";
import OpenModalButton from "../OpenModalButton";

const SpotReviewsIndexItem = ({ review, spot }) => {
    return (
        <>
            <div className="spot-review-item-container">
                <div className="spot-review-item-header">
                    <div className="creator-pic">
                    <i className="fa-duotone fa-circle-user"></i>
                    </div>
                    <div className="creator-name">
                        {review.User.firstName}
                    </div>
                </div>
            </div>
        </>
    )
};

export default SpotReviewsIndexItem;
