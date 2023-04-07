import "./SpotReviewsIndexItem.css";
import profPic from "../../assets/prof-pic.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";

const SpotReviewsIndexItem = ({ review, spot }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const date = new Date(review.createdAt);
    const dateString = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    const currentUser = useSelector(state => state.session.user);

    return (
        <>
            <div className="spot-review-item-container">
                <div className="spot-review-item-header">
                    <div className="user-info-review">
                        <div className="creator-pic">
                            <img className="prof-pic" src={profPic} alt="" />
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
                    {currentUser && currentUser.id === review.userId && (
                        <div className="edit-delete-review-container">
                            <div className="edit-review-container">
                                <i className="fa-solid fa-file-pen"></i>
                            </div>
                            <div onClick={() => dispatch(deleteReviewThunk(review.id))} className="delete-review-container">
                                <i className="fa-solid fa-trash-can"></i>
                                {/* <button onClick={() => dispatch(deleteReviewThunk(review.id)).then(closeModal())} className="delete-review-button">Delete review</button> */}
                            </div>
                        </div>
                    )}
                </div>
                <div className="review-text">
                    {review.review}
                </div>
            </div>
        </>
    )
};

export default SpotReviewsIndexItem;
