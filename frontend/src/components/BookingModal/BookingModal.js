import React, { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
import "./BookingModal.css";
import logo from "../../assets/NomadNest-logo.png";
import checkmark from "../../assets/check.gif";

const BookingModal = ({ onSuccess }) => {
    const { closeModal } = useModal();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep === 0) {
            setTimeout(() => {
                setCurrentStep(1);
            }, 2000);
        } else if (currentStep === 1) {
            setTimeout(() => {
                setCurrentStep(2);
            }, 2000);
        } else if (currentStep === 2) {
            setTimeout(() => {
                closeModal();
                onSuccess();
            }, 3000);
        }
    }, [currentStep]);

    return (
        <>
            {currentStep === 0 && (
                <div className='res-success-modal1'>
                    <img className='res-success-logo' src={logo} />
                    <div> Just a moment, we're getting <br /> your trip ready </div>
                </div>
            )}
            {currentStep === 1 && (
                <div className='res-success-modal2'>
                    <div> Reviewing payment details... </div>
                </div>
            )}
            {currentStep === 2 && (
                <div className='res-success-modal3'>
                    <div><img className='red-check' src={checkmark} /></div>
                </div>
            )}
        </>
    );
}


export default BookingModal;
