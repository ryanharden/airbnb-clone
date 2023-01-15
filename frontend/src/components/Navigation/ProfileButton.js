// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import "./Navigation.css";
// import OpenModalMenuItem from './OpenModalMenuItem';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//         if (!ulRef.current.contains(e.target)) {
//             setShowMenu(false);
//         }
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const closeMenu = () => setShowMenu(false);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//     closeMenu();
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//   return (
//     <>
//       <button className="button" onClick={openMenu}>
//         <i class="fa-sharp fa-solid fa-bars fa-lg"></i>
//         <i className="fas fa-user-circle fa-2x" />
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         {user ? (
//           <>
//             <li>{user.username}</li>
//             <li>{user.firstName} {user.lastName}</li>
//             <li>{user.email}</li>
//             <li>
//               <button onClick={logout}>Log Out</button>
//             </li>
//           </>
//         ) : (
//             <>
//             <OpenModalMenuItem
//               itemText="Log In"
//               onItemClick={closeMenu}
//               modalComponent={<LoginFormModal />}
//             />
//             <OpenModalMenuItem
//               itemText="Sign Up"
//               onItemClick={closeMenu}
//               modalComponent={<SignupFormModal />}
//             />
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;






import React from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./Navigation.css";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useModal } from "../../context/Modal";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeModal();
    };

    return (
        <>
            <button className="profile-button" onClick={() => setModalContent(
                <>
                    <div className="dropdown-menu-container">
                        {user ? (
                            <>
                                <li>{user.username}</li>
                                <li>{user.firstName} {user.lastName}</li>
                                <li>{user.email}</li>
                                <li>
                                    <button onClick={logout}>Log Out</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <OpenModalMenuItem
                                    itemText="Log In"
                                    modalComponent={<LoginFormModal />}
                                />
                                <OpenModalMenuItem
                                    itemText="Sign Up"
                                    modalComponent={<SignupFormModal />}
                                />
                            </>
                        )}
                    </div>
                </>
            )}>
                <i className="fa-sharp fa-solid fa-bars fa-lg"></i>
                <i className="fas fa-user-circle fa-2x" />
            </button>
        </>
    );
}

export default ProfileButton;

// import React from "react";
// import { useState } from "react";
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
//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//         closeModal();
//     };

//     const setLoginModal = () => {
//         setModalContent(<LoginFormModal />);
//         setDropdownOpen(false);
//     };
//     const setSignupModal = () => {
//         setModalContent(<SignupFormModal />);
//         setDropdownOpen(false);
//     };

//     const openDropdown = () => {
//         setModalContent(
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
//                         <div className="login-signup-container">
//                             <OpenModalMenuItem
//                                 itemText="Log In"
//                                 onItemClick={setLoginModal}
//                                 modalComponent={<LoginFormModal />}
//                             />
//                             <OpenModalMenuItem
//                                 itemText="Sign Up"
//                                 onItemClick={setSignupModal}
//                                 modalComponent={<SignupFormModal />}
//                             />
//                         </div>
//                         </>
//                     )}
//                 </div>
//             </>
//         )
//         setDropdownOpen(true);
//     }

//     return (
//         <>
//             <button className="button" onClick={openDropdown}>
//                 <i class="fa-sharp fa-solid fa-bars fa-lg"></i>
//                 <i className="fas fa-user-circle fa-2x"></i>
//             </button>
//         </>
//     )
// }

// export default ProfileButton;
