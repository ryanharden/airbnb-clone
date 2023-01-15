import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="nav-bar">
      <li>
        <NavLink exact to="/">
            <img className='logo' src={require('../../NomadNest-logo.png')} alt="NomadNest-logo"></img>
        </NavLink>
      </li>
      {isLoaded && (
        <li className='li-profile-button'>
        <ProfileButton user={sessionUser} />
      </li>
      )}
    </ul>
  );
}

export default Navigation;
