import React, { useRef } from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className,
  disabled,
  shake
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    if (typeof onButtonClick === 'function') {
      const shouldPreventModal = onButtonClick(e);

      if (shouldPreventModal) {
        return;
      }
    }
    if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  const buttonClassName = [
    "OpenModalButton",
    className,
    shake ? "shake" : "",
  ].join(" ");

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled} >{buttonText}</button>
  );
}

export default OpenModalButton;
