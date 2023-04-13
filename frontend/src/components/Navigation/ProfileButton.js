import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./Navigation.css";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from "../OpenModalButton";
import CreateSpot from "../CreateSpot/CreateSpot";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import githubMark from "../../assets/github-mark.png";
import githubLogo from "../../assets/GitHub_Logo.png";
import linkedIn from "../../assets/linked-in-blue.png";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        navigate("/")
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className="right-nav-bar">
                <OpenModalButton className="add-spot-button"
                    modalComponent={user ? <CreateSpot /> : <LoginFormModal />}
                    buttonText="List your nest"
                />
                <button className="profile-button" onClick={openMenu}>
                    <i className="fa-sharp fa-solid fa-bars fa-lg"></i>
                    <i className="fas fa-user-circle fa-2x" />
                </button>
            </div>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <div className="dropdown-container-in">
                            <div className="if-logged-in">
                                <li className="username"><span className="item-def">Username: </span>{user?.username}</li>
                                <li><span className="item-def">Name: </span>{user?.firstName} {user.lastName}</li>
                                <li><span className="item-def">Email: </span>{user?.email}</li>
                                <li><Link onClick={closeMenu} to={"/bookings/current"} className="trips-link">My Trips</Link></li>
                                <li><OpenModalButton className="add-spot-li-button"
                                    modalComponent={<CreateSpot />}
                                    onItemClick={closeMenu}
                                    buttonText="List your nest"
                                /></li>
                            </div>
                            <div className="links-drop">
                                <li>
                                    <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/ryanharden-dev" className="linked-drop">
                                        <img className="linked-in-logo-drop" src={linkedIn} alt="linkedin logo" />
                                    </a>
                                </li>
                                <li>
                                    <a rel="noreferrer" target="_blank" href="https://github.com/ryanharden" className="footer-link-drop">
                                        <img className="github-mark-drop" src={githubMark} alt="github mark" />
                                        <img className="github-logo-drop" src={githubLogo} alt="github logo" />
                                    </a>
                                </li>
                            </div>
                            <div className="logout">
                                <li className="logout-button" onClick={logout}>Log Out</li>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="dropdown-container-out">
                            <div className="login-signup">
                                <div className="dropdown-menu-item-login">
                                    <OpenModalMenuItem
                                        itemText="Log In"
                                        onItemClick={closeMenu}
                                        modalComponent={<LoginFormModal />}
                                    />
                                </div>
                                <div className="dropdown-menu-item-signup">
                                    <OpenModalMenuItem
                                        itemText="Sign Up"
                                        onItemClick={closeMenu}
                                        modalComponent={<SignupFormModal />}
                                    />
                                </div>
                            </div>
                            <div className="host-help">
                                <div className="host-experience">
                                    <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/ryanharden-dev" className="footer-link">
                                        <img className="linked-in-logo-drop" src={linkedIn} alt="linkedin logo" />
                                    </a>
                                </div>
                                <div className="help">
                                    <a rel="noreferrer" target="_blank" href="https://github.com/ryanharden" className="footer-link">
                                        <img className="github-mark-drop" src={githubMark} alt="github mark" />
                                        <img className="github-logo-drop" src={githubLogo} alt="github logo" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;






// import React from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import "./Navigation.css";
// import OpenModalMenuItem from './OpenModalMenuItem';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// import { useModal } from "../../context/Modal";

// function ProfileButton({ user }) {
//     const dispatch = useDispatch();
//     const { setModalContent, closeModal } = useModal();

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//         closeModal();
//     };

    // return (
    //     <>
    //         <button className="profile-button" onClick={() => setModalContent(
    //             <>
    //                 <div className="dropdown-menu-container">
    //                     {user ? (
    //                         <>
    //                             <li>{user.username}</li>
    //                             <li>{user.firstName} {user.lastName}</li>
    //                             <li>{user.email}</li>
    //                             <li>
    //                                 <button onClick={logout}>Log Out</button>
    //                             </li>
    //                         </>
    //                     ) : (
    //                         <>
    //                             <OpenModalMenuItem
    //                                 itemText="Log In"
    //                                 modalComponent={<LoginFormModal />}
    //                             />
    //                             <OpenModalMenuItem
    //                                 itemText="Sign Up"
    //                                 modalComponent={<SignupFormModal />}
    //                             />
    //                         </>
    //                     )}
    //                 </div>
    //             </>
    //         )}>
    //             <i className="fa-sharp fa-solid fa-bars fa-lg"></i>
    //             <i className="fas fa-user-circle fa-2x" />
    //         </button>
    //     </>
    // );
// }

// export default ProfileButton;
