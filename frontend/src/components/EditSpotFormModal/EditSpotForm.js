import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { updateSpotThunk, deleteImageThunk, getSpotThunk } from '../../store/spots';
import "./EditSpotForm.css";
import spinner from "../../assets/Iphone-spinner-2.gif";

const validFileTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

const EditSpotForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const spot = useSelector(state => state.Spots.singleSpot);
    // console.log(spot);
    // const sessionUser = useSelector((state) => state.session.user);

    const [name, setName] = useState(spot.name);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState([]);
    const [lng, setLng] = useState(117.1611);
    const [lat, setLat] = useState(32.7157);
    const [images, setImages] = useState(spot.SpotImages);
    const [image, setImage] = useState(null);
    const [prevImages, setPrevImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [prevImage, setPrevImage] = useState(null);
    const [category, setCategory] = useState(spot.category);
    const [guests, setGuests] = useState(spot.guests);
    const [bedrooms, setBedrooms] = useState(spot.bedrooms);
    const [beds, setBeds] = useState(spot.beds);
    const [bathrooms, setBathrooms] = useState(spot.bathrooms);
    const [wifi, setWifi] = useState(spot.wifi);
    const [parking, setParking] = useState(spot.parking);
    const [kitchen, setKitchen] = useState(spot.kitchen);
    const [pets, setPets] = useState(spot.pets);
    const [washer, setWasher] = useState(spot.washer);
    const [dryer, setDryer] = useState(spot.dryer);
    const [loading, setLoading] = useState(false);

    // console.log("wifi: ", wifi);

    const categories = ["Beach", "Cabin", "Camping", "Countryside", "Desert", "Lake", "National Parks", "Tropical", "Vineyard"]
    const guestNums = Array.from({ length: 16 }, (_, i) => i + 0);
    const bedroomNums = Array.from({ length: 11 }, (_, i) => i + 0);
    const bedNums = Array.from({ length: 11 }, (_, i) => i + 0);
    const bathNums = Array.from({ length: 6 }, (_, i) => i + 0);

    const validateForm = (form) => {
        const errors = [];
        if (form.guests < 1) {
            errors.push("Must have at least one guest");
        }
        if (!form.name) errors.push("Please enter a name.");
        if (!form.address) errors.push("Please enter an address.");
        if (!form.city) errors.push("Please enter a city.");
        if (!form.state) errors.push("Please enter a state.");
        if (!form.country) errors.push("Please enter a country.");
        if (!form.description) {
            errors.push("Please enter a description.");
        } else if (form.description.length > 5000) {
            errors.push("Description must be less than 5000 characters");
        } else if (form.description.length < 3) {
            errors.push("Description must be at least 3 characters")
        }

        if (!form.category) {
            errors.push("Please select a category");
        }

        if (form.price === "" || parseFloat(form.price) === 0 || parseFloat(form.price) > 10000) {
            errors.push("Price must be a number greater than 0 and less than 10000");
        } else if (isNaN(form.price)) {
            errors.push("Price must be a number")
        }

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedSpot = {
            name,
            address,
            city,
            state,
            country,
            lat,
            lng,
            description,
            price,
            category,
            guests,
            bedrooms,
            beds,
            bathrooms,
            wifi,
            parking,
            kitchen,
            pets,
            washer,
            dryer
        }

        const { id, Owner, numReviews, avgStarRating, SpotImages } = spot;

        const spotDetails = {
            id,
            Owner,
            numReviews,
            avgStarRating,
            SpotImages: [...images, ...newImages]
        }

        const validationErrors = validateForm(editedSpot);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        // console.log("editedSpot: ", editedSpot);

        try {
            await dispatch(updateSpotThunk(editedSpot, spotDetails));
            setLoading(true);
            navigate(`/spots/${id}`);
            closeModal();
        } catch (err) {
            const data = await err.response.json();
            if (data && data.errors) setErrors(data.errors);
        }

    };

    const handleImages = async (e) => {
        const files = e.target.files;
        const invalidFiles = Array.from(files).filter(file => !validFileTypes.includes(file.type));
        if (invalidFiles.length > 0) {
            setErrors(["Invalid file type, please try again"]);
            return;
        }
        if (images.length + files.length > 5) {
            setErrors(["A spot can have a max of 5 images"]);
            return;
        }
        const imageFiles = Array.from(files);
        if (imageFiles.length > 0) {
            setPrevImages([...prevImages, ...imageFiles]);
            setImages([...images, ...imageFiles]);
        }
    }

    const handleImageRemoveEdit = (e, i) => {
        e.preventDefault();
        const newImages = [...images];
        const newSpotImages = [...spot.SpotImages];
        // console.log(newImages);
        const deletedImage = newImages.splice(i, 1)[0];
        let deletedImageId;
        if (deletedImage.id) {
            deletedImageId = deletedImage.id;
        } else {
            const deletedImageUrl = deletedImage.url;
            const matchingSpotImage = newSpotImages.find((img) => img.url === deletedImageUrl);
            deletedImageId = matchingSpotImage?.id;
        }
        newSpotImages.splice(i, 1);
        setImages(newImages);
        dispatch(deleteImageThunk(deletedImageId));
        if (newImages.length === 1) {
            setImage(newImages[0])
        }

        const previewImageContainers = document.getElementsByClassName('preview-image-container');
        if (previewImageContainers.length === newSpotImages.length) {
            setPrevImage(newSpotImages[0]);
        }
        const updatedPreviewImages = Array.from(previewImageContainers);
        updatedPreviewImages.splice(i, 1);
        updatedPreviewImages.forEach((container, idx) => {
            const img = container.querySelector('.preview-images-image');
            if (img.src === deletedImage?.url) {
                setPrevImage(updatedPreviewImages[idx]?.querySelector('.preview-images-image') || updatedPreviewImages[idx - 1]?.querySelector('.preview-images-image') || null);
                newImages.splice(idx, 0, deletedImage);
            }
            container.querySelector('.preview-image-btn').setAttribute('onclick', `handleImageRemoveEdit(event, ${idx})`);
        });
        setPrevImages(newSpotImages?.map(image => ({ url: image.url })));
    };

    let spotImages;
    if (spot && spot.SpotImages.length) {
        spotImages = (
            images.map((image, i) => {
                return (
                    <React.Fragment key={i}>
                        <div className="preview-image-btn-container">
                            <div className="preview-image-btn" onClick={(e) => handleImageRemoveEdit(e, i)}>
                                <i onClick={(e) => handleImageRemoveEdit(e, i)} className="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                        <img className={'preview-images-image'}
                            src={image.url ? image.url : URL.createObjectURL(image)}
                            alt={'preview'}
                        />
                    </React.Fragment>
                )
            })
        )
    } else if (images.length || newImages.length) {
        spotImages = (
            [...images, ...newImages].map((image, i) => {
                return (
                    <React.Fragment key={i}>
                        <div className="preview-image-btn-container">
                            <div className="preview-image-btn" onClick={(e) => handleImageRemoveEdit(e, i)}>
                                <i onClick={(e) => handleImageRemoveEdit(e, i)} className="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                        <img className={'preview-images-image'}
                            src={image.url ? image.url : URL.createObjectURL(image)}
                            alt={'preview'}
                        />
                    </React.Fragment>
                )
            })
        )
    }

    return (
        <>
            <div className='spot-form-header-container'>
                <div className='spot-form-header'>
                    <h1>Edit your nest</h1>
                </div>
                <div onClick={(e) => closeModal()} className='close-modal-x'>
                    <i className="fa-solid fa-xmark fa-lg"></i>
                </div>
            </div>
            <div className='spot-form-container'>
                <form className='spot-form' onSubmit={handleSubmit}>
                    <ul className='errors-spot'>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <input className='spot-form-input-name'
                        type="text"
                        placeholder="Title"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input className='spot-form-input address'
                        type="text"
                        placeholder="Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className='city-state-country'>
                        <input className='location-input city'
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input className='location-input'
                            type="text"
                            placeholder="State"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <input className='location-input country'
                            type="text"
                            placeholder="Country"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <select className='category-select'
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>{spot?.category}</option>
                        {categories.map((ele, indx) => (
                            <option key={indx} value={ele}>
                                {ele}
                            </option>
                        ))}
                    </select>
                    <div className='guest-rooms'>
                        <div className='select-div'>
                            <label className="select-label" htmlFor='guests'>Guests:</label>
                            <select className='room-select'
                                id="guests"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                            >
                                {/* <option selected="true" disabled="disabled">Guests</option> */}
                                {guestNums.map((ele, indx) => (
                                    <option key={indx} value={ele}>
                                        {ele}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='select-div'>
                            <label className="select-label" htmlFor='bedrooms'>Bedrooms:</label>
                            <select className='room-select'
                                id="bedroooms"
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                            >
                                {/* <option selected="true" disabled="disabled">Bedrooms</option> */}
                                {bedroomNums.map((ele, indx) => (
                                    <option key={indx} value={ele}>
                                        {ele}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='select-div'>
                            <label className="select-label" htmlFor='beds'>Beds:</label>
                            <select className='room-select'
                                id="beds"
                                value={beds}
                                onChange={(e) => setBeds(e.target.value)}
                            >
                                {/* <option selected="true" disabled="disabled" >Beds</option> */}
                                {bedNums.map((ele, indx) => (
                                    <option key={indx} value={ele}>
                                        {ele}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='select-div'>
                            <label className="select-label" htmlFor='baths'>Baths:</label>
                            <select className='room-select'
                                id="bathrooms"
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                            >
                                {/* <option selected="true" disabled="disabled">Bathrooms</option> */}
                                {bathNums.map((ele, indx) => (
                                    <option key={indx} value={ele}>
                                        {ele}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <textarea className='spot-form-input description'
                        placeholder="Description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className='price-lng-lat'>
                        <input className='spot-form-input price'
                            type="number"
                            placeholder="Price per night"
                            required
                            min="1"
                            max="10000"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <div className='input-lat'>
                            <span className='lattext'>Lat</span>
                            <input
                                className='spot-form-input lat'
                                min="-90"
                                max="90"
                                type="number"
                                value={lat.toFixed(8)}
                                onChange={(e) => setLat(parseFloat(e.target.value))}
                                placeholder="Latitude"
                                step='any'
                                disabled
                                required />
                        </div>
                        <div className='input-lng'>
                            <span className='lngtext'>Lng</span>
                            <input
                                className='spot-form-input lng'
                                min="-180"
                                max="180"
                                type="number"
                                value={lng.toFixed(8)}
                                onChange={(e) => setLng(parseFloat(e.target.value))}
                                placeholder="Longitude"
                                step='any'
                                disabled
                                required />
                        </div>
                    </div>
                    <div className='checkboxes'>
                        <div className='wifi-checkbox'>
                            <label htmlFor="wifi-checkbox">Wifi</label>
                            <input
                                id='wifi-checkbox'
                                type="checkbox"
                                onChange={() => setWifi(!wifi)}
                                checked={wifi ? true : false}
                            />
                        </div>
                        <div className='parking-checkbox'>
                            <label htmlFor="parking-checkbox">Parking</label>
                            <input
                                id='parking-checkbox'
                                type="checkbox"
                                onChange={() => setParking(!parking)}
                                checked={parking ? true : false}
                            />
                        </div>
                        <div className='kitchen-checkbox'>
                            <label htmlFor="kitchen-checkbox">Kitchen</label>
                            <input
                                id='kitchen-checkbox'
                                type="checkbox"
                                onChange={() => setKitchen(!kitchen)}
                                checked={kitchen ? true : false}
                            />
                        </div>
                        <div className='pets-checkbox'>
                            <label htmlFor="pets-checkbox">Pets allowed</label>
                            <input
                                id='pets-checkbox'
                                type="checkbox"
                                onChange={() => setPets(!pets)}
                                checked={pets ? true : false}
                            />
                        </div>
                        <div className='washer-checkbox'>
                            <label htmlFor="washer-checkbox">Washer</label>
                            <input
                                id='washer-checkbox'
                                type="checkbox"
                                onChange={() => setWasher(!washer)}
                                checked={washer ? true : false}
                            />
                        </div>
                        <div className='dryer-checkbox'>
                            <label htmlFor="dryer-checkbox">Dryer</label>
                            <input
                                id='dryer-checkbox'
                                type="checkbox"
                                onChange={() => setDryer(!dryer)}
                                checked={dryer ? true : false}
                            />
                        </div>
                    </div>

                    <div className="preview-image-input">
                        <div className='add-photo-input'>
                            <label htmlFor="images" className="add-photo">
                                Add photo
                            </label>
                            <div className='photo-info'>
                                (Your first image will be the preview image)
                            </div>
                            <input
                                type="file"
                                name="images"
                                multiple
                                accept="image/*"
                                id="images"
                                onChange={handleImages}
                                className="spot-file-input"
                            />
                        </div>
                        <div className="total-images-container">
                            {spotImages}
                        </div>
                    </div>
                    <button onClick={() => setLoading(true)} className='spot-form-button' type="submit">Save</button>
                    {loading && (<div className="loading-spinner"><img src={spinner} className="spinner" /><div className="loading">Loading...</div></div>)}
                </form>
            </div>
        </>
    )
}

export default EditSpotForm;
