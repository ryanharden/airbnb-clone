import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useLocation } from "react-router-dom";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const location = useLocation();
  const navClassName = location.pathname === "/" ? "allSpotNav" : "showNav";

  // console.log(navClassName);
  return (
    <div className='nav-bar-wrapper'>
      <div className={navClassName}>
        <NavLink exact to="/">
          <div className='logo-text'>
            <img className='logo' src={require('../../assets/NomadNest-logo.png')} alt="NomadNest-logo"></img>
            <div className='nomad-nest'>Nomad Nest</div>
          </div>
        </NavLink>
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
