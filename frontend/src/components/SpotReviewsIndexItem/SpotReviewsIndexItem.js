import "./SpotReviewsIndexItem.css";
import star from "../../assets/star.png";
import OpenModalButton from "../OpenModalButton";
import profPic from "../../assets/prof-pic.jpeg";

const SpotReviewsIndexItem = ({ review, spot }) => {
    const date = new Date(review.createdAt);
    const dateString = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    return (
        <>
            <div className="spot-review-item-container">
                <div className="spot-review-item-header">
                    <div className="creator-pic">
                        <img className="prof-pic" src={profPic} alt="No picture" />
                    </div>
                    <div className="name-date">
                        <div className="creator-name">
                            {review.User.firstName}
                        </div>
                        <div className="created-review-date">
                            {dateString}
                        </div>
                    </div>
                </div>
                <div className="review-text">
                    {review.review}
                </div>
            </div>
        </>
    )
};

export default SpotReviewsIndexItem;
