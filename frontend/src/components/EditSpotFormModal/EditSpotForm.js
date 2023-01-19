import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { updateSpotThunk } from '../../store/spots';
import "./EditSpotForm.css";

const EditSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const spot = useSelector(state => state.Spots.singleSpot);
    // console.log(spot);
    const sessionUser = useSelector((state) => state.session.user);
    // console.log(sessionUser);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        const errors = [];
        if (name.length === 0) errors.push("You must enter a name.");
        if (address.length === 0) errors.push("You must enter an address.");
        if (city.length === 0) errors.push("You must enter a city.");
        if (state.length === 0) errors.push("You must enter a valid state.");
        if (country.length === 0) errors.push("You must enter a valid country.");
        if (description.length === 0) errors.push("You must enter a valid description.");
        if (price <= 0) errors.push("You must enter a valid price.");

        setErrors(errors);
    }, [name, address, city, state, country, description, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedSpot = {
            name,
            address,
            city,
            state,
            country,
            description,
            price,
            lat: 38.9922,
            lng: 137.9281
        }

        const { id, Owner, numReviews, avgStarRating, SpotImages } = spot;

        const spotDetails = {
            id,
            Owner,
            numReviews,
            avgStarRating,
            SpotImages
        }

        dispatch(updateSpotThunk(editedSpot, spotDetails))
            .then(history.push(`/spots/${id}`))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            }
            )
    };

    return (
        <>
            {sessionUser.id !== spot.ownerId ? <div className='not-owner'>Nice try bucko, you are not the owner of this spot!</div>
                :
                <>
                    <div className='edit-spot-form-header'>
                        <h1>Edit Your Spot</h1>
                    </div>
                    <div className='edit-spot-form-container'>
                        <form className='edit-spot-form' onSubmit={handleSubmit}>
                            <ul className='errors-spot-edit'>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <input className='edit-spot-form-input-name'
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input className='edit-spot-form-input'
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input className='edit-spot-form-input'
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input className='edit-spot-form-input'
                                type="text"
                                placeholder="State"
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <input className='edit-spot-form-input'
                                type="text"
                                placeholder="Country"
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            <textarea className='edit-spot-form-input'
                                placeholder="Description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <input className='edit-spot-form-input-price'
                                type="number"
                                placeholder="Price"
                                required
                                min="1"
                                max="2000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <button className='edit-spot-form-button' type="submit">Edit Spot</button>
                        </form>
                    </div>
                </>
            }
        </>
    )
}

export default EditSpotForm;
