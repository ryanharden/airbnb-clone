import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import DemoUser from '../DemoUser/DemoUser';
import "./LoginForm.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <>
      <div className='form-header'>
        <h1>Log in</h1>
        <div onClick={(e) => closeModal()} className='close-modal-login'>
          <i className="fa-solid fa-xmark fa-2x login"></i>
        </div>
      </div>
      <div className='form-container'>
        <form className="form" onSubmit={handleSubmit}>
          <ul className='errors-login'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <input className='form-input-credential'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username or Email'
          />
          <input className='form-input-password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
          <button className="log-in" type="submit">Log in</button>
          <DemoUser />
        </form>
      </div>
    </>
  );
};

export default LoginFormModal;
