import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./Navigation.css";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from "../OpenModalButton";
import CreateSpot from "../CreateSpot/CreateSpot";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
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
        history.push("/")
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className="right-nav-bar">
                <OpenModalButton className="add-spot-button"
                    modalComponent={<CreateSpot />}
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
                                <li className="username">{user.username}</li>
                                <li>{user.firstName} {user.lastName}</li>
                                <li>{user.email}</li>
                                <li><OpenModalButton className="add-spot-li-button"
                                    modalComponent={<CreateSpot />}
                                    buttonText="List your nest"
                                /></li>
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
                                <div className="host-experience">Host an experience</div>
                                <div className="help">Help</div>
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
