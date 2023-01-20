import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotThunk } from '../../store/spots';
import EditSpotForm from '../EditSpotFormModal/EditSpotForm';
import DeleteSpotForm from '../DeleteSpot/DeleteSpotForm';
import OpenModalButton from '../OpenModalButton';
import SpotReviews from '../SpotReviews/SpotReviews';
import star from "../../assets/star.png";
import "./SpotShow.css";

const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.Spots.singleSpot);
    const dispatch = useDispatch();
    // const history = useHistory();

    console.log(spot);

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
        // .catch(() => history.push("/"))
    }, [dispatch, spotId])


    if (!Object.values(spot).length) return null;


    return (
        <div>
            <div className='spot-show-page'>
                <div className='spot-header'>
                    <h1 className='spot-name'>{spot.name}</h1>
                    <div className='details-edit-spot'>
                        <div className="avgStarRating-numReviews-location">
                            <div id="avgStarRating"><img id="star" src={star} alt="" />{spot.avgStarRating}</div>
                            <div id='period'>•</div>
                            <div id="numReviews">{spot.numReviews} review(s)</div>
                            <div id='period'>•</div>
                            <div id="city-state-country">{spot.city}, {spot.state}, {spot.country}</div>
                        </div>
                        <div className='edit-delete-actions'>
                            <button className='edit-spot-button'>
                                <i className="fa-regular fa-pen-to-square"></i>
                                <OpenModalButton
                                    className="edit-spot-modal-button"
                                    modalComponent={<EditSpotForm />}
                                    buttonText="Edit Spot"
                                />
                            </button>
                            <button className='delete-spot-button'>
                                <i className="fa-solid fa-trash-can"></i>
                                <OpenModalButton
                                    className="delete-spot-modal-button"
                                    modalComponent={<DeleteSpotForm />}
                                    buttonText="Delete Spot"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='spot-images-container'>
                    <div className='main-image-container'>
                        {spot.SpotImages.length > 0 ? <img src={spot.SpotImages[0].url} alt="none" /> : <p>No images available</p>}
                    </div>
                    {/* <div className="other-images-container">
                        {spot.SpotImages.length > 1 ? <img src={spot.SpotImages[1].url} alt="none" /> : null}
                        {spot.SpotImages.length > 2 ? <img id="image-3" src={spot.SpotImages[2].url} alt="none" /> : null}
                        {spot.SpotImages.length > 3 ? <img src={spot.SpotImages[3].url} alt="none" /> : null}
                        {spot.SpotImages.length > 4 ? <img id="image-5" src={spot.SpotImages[4].url} alt="none" /> : null}
                    </div> */}
                    <div className='other-images-container'>
                        {spot.SpotImages && (
                            spot.SpotImages.slice(1, 5).map((image, index) => (
                                <img src={image.url} alt={spot.name} key={image.id} className={`image-${index}`}/>
                            ))
                        )}
                    </div>
                </div>
                <div className='single-spot-description'>
                    {spot.Owner && (
                        <h2>Entire home hosted By {spot.Owner.firstName}</h2>
                    )}
                    <p>{spot.description}</p>
                </div>
                <div className='spot-reviews'>
                    <SpotReviews />
                </div>
            </div>
        </div>
    )
}

export default SpotShow;
