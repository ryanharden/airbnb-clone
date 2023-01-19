import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from '../../store/spots';
import "./DeleteSpotForm.css";

const DeleteSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal();

    const spot = useSelector(state => state.Spots.singleSpot);
    // console.log(spot);
    const sessionUser = useSelector((state) => state.session.user);
    // console.log(sessionUser);

    const [errors, setErrors] = useState([]);
    const [yes, setYes] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(deleteSpotThunk(spot.id))
            .then(history.push('/'))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    return (
        <>
            {sessionUser.id !== spot.ownerId ? <div className='not-owner'>Nice try bucko, you are not the owner of this spot!</div>
                :
                <>
                    <div className='delete-spot-form-header'>
                        <h1>Are you sure you want to delete this spot?</h1>
                    </div>
                    <div className='delete-spot-form-container'>
                        <form className='delete-spot-form' onSubmit={handleSubmit}>
                            <ul className='errors-spot-delete'>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <div className='radio-buttons'>
                                <label>
                                    Yes
                                    <input className='yes-button'
                                        type="radio"
                                        required
                                        checked={yes}
                                        onChange={(e) => setYes(true)}
                                    />
                                </label>
                                <label>
                                    No
                                    <input className='no-button'
                                        type="radio"
                                        required
                                        checked={yes ? false : true}
                                        onChange={(e) => setYes(false)}
                                    />
                                </label>
                            </div>
                            <button
                                className='confirm-button'
                                type="submit"
                                disabled={!yes}
                            >Confirm
                            </button>
                        </form>
                    </div>
                </>
            }
        </>
    )
};

export default DeleteSpotForm;
