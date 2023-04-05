import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { createSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import './CreateSpot.css';

const CreateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('United States');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [lng, setLng] = useState(117.1611);
    const [lat, setLat] = useState(32.7157);
    const [previewImage, setPreviewImage] = useState("");
    const [category, setCategory] = useState("");
    const [guests, setGuests] = useState();
    const [bedrooms, setBedrooms] = useState();
    const [beds, setBeds] = useState();
    const [bathrooms, setBathrooms] = useState();
    const [wifi, setWifi] = useState(false);
    const [parking, setParking] = useState(false);
    const [kitchen, setKitchen] = useState(false);
    const [pets, setPets] = useState(false);
    const [washer, setWasher] = useState(false);
    const [dryer, setDryer] = useState(false);

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const categories = ["Beach", "Cabin", "Camping", "Countryside", "Desert", "Lake", "National Parks", "Tropical", "Vineyard"]
    const guestNums = Array.from({ length: 15 }, (_, i) => i + 1);
    const bedroomNums = Array.from({ length: 10 }, (_, i) => i + 1);
    const bathNums = Array.from({ length: 5 }, (_, i) => i + 1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        const newSpotData = {
            name,
            address,
            city,
            state,
            country,
            lat: 32.7157,
            lng: 117.1611,
            description,
            price,
            category,
        };

        dispatch(createSpotThunk(newSpotData, previewImage))
            .then((res) => history.push(`/spots/${res.id}`))
            // .then((res) => setNewSpot(res))
            // .then((res) => console.log(res))
            .then(closeModal())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
    };

    // useEffect(() => {
    //     if (newSpot) {
    //         history.push(`/spots/${newSpot.id}`)
    //     }
    // }, [newSpot])


    return (
        <>
            {sessionUser ?
                <>
                    <div className='spot-form-header'>
                        <h1>List your nest</h1>
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
                                <option>--Select a Category--</option>
                                {categories.map((ele, indx) => (
                                    <option key={indx} value={ele}>
                                        {ele}
                                    </option>
                                ))}
                            </select>
                            <div className='guest-rooms'>
                                <select className='room-select'
                                    id="guests"
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                >
                                    <option selected="true" disabled="disabled">Guests</option>
                                    {guestNums.map((ele, indx) => (
                                        <option key={indx} value={ele}>
                                            {ele}
                                        </option>
                                    ))}
                                </select>
                                <select className='room-select'
                                    id="bedroooms"
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(e.target.value)}
                                >
                                    <option selected="true" disabled="disabled">Bedrooms</option>
                                    {bedroomNums.map((ele, indx) => (
                                        <option key={indx} value={ele}>
                                            {ele}
                                        </option>
                                    ))}
                                </select>
                                <select className='room-select'
                                    id="beds"
                                    value={beds}
                                    onChange={(e) => setBeds(e.target.value)}
                                >
                                    <option selected="true" disabled="disabled" >Beds</option>
                                    {guestNums.map((ele, indx) => (
                                        <option key={indx} value={ele}>
                                            {ele}
                                        </option>
                                    ))}
                                </select>
                                <select className='room-select'
                                    id="bathrooms"
                                    value={bathrooms}
                                    onChange={(e) => setBathrooms(e.target.value)}
                                >
                                    <option selected="true" disabled="disabled">Bathrooms</option>
                                    {bathNums.map((ele, indx) => (
                                        <option key={indx} value={ele}>
                                            {ele}
                                        </option>
                                    ))}
                                </select>
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
                                    max="2000"
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
                            <input className='spot-form-input-url'
                                type="url"
                                placeholder="Preview Image Link"
                                required
                                value={previewImage}
                                onChange={(e) => setPreviewImage(e.target.value)}
                            />
                            <button className='spot-form-button' type="submit">Create New Spot</button>
                        </form>
                    </div>
                </>
                : <div className='not-logged-in'>Sorry bucko, Please be logged in to do this.</div>
            }
        </>
    )
}

export default CreateSpot;
