import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { createSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import './CreateSpot.css';

const CreateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // const [newSpot, setNewSpot] = useState();

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
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input className='spot-form-input'
                        type="text"
                        placeholder="Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input className='spot-form-input'
                        type="text"
                        placeholder="City"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input className='spot-form-input'
                        type="text"
                        placeholder="State"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <input className='spot-form-input'
                        type="text"
                        placeholder="Country"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <textarea className='spot-form-input'
                        placeholder="Description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input className='spot-form-input'
                        type="number"
                        placeholder="Price"
                        required
                        min="1"
                        max="2000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
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
    )
}

export default CreateSpot;
