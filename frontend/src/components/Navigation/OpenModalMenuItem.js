// The OpenModalMenuItem component is a functional component that renders a li element with the text specified in the itemText prop. When this li element is clicked, the component opens a modal by calling the setModalContent function from the useModal hook, passing it the modalComponent prop. Additionally, it also sets the setOnModalClose function with the optional onModalClose prop. It also triggers the optional onItemClick callback function if it exists.

// The component receives 4 props:

// modalComponent is a React component that will be rendered inside the modal when the menu item is clicked.
// itemText is a string that will be displayed as the text of the menu item.
// onItemClick is an optional callback function that will be called when the menu item is clicked.
// onModalClose is an optional callback function that will be called when the modal is closed.
// It uses the useModal hook to access the setModalContent and setOnModalClose functions from the modal context.

// You can use this component to create a menu item that opens a modal when clicked, and pass the component to be rendered inside the modal as a prop. It's useful when you want to open a modal by clicking on a menu item and also have the ability to pass a callback function to be called when the modal is closed.


import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  return (
    <li onClick={onClick}>{itemText}</li>
  );
}

export default OpenModalMenuItem;
