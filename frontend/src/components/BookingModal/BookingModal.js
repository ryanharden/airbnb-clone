import React, { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
import "./BookingModal.css";
import logo from "../../assets/NomadNest-logo.png";
import checkmark from "../../assets/red-check.mp4";

const BookingModal = ({ onSuccess }) => {
    const { closeModal } = useModal();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep === 0) {
            setTimeout(() => {
                setCurrentStep(1);
            }, 1500);
        } else if (currentStep === 1) {
            setTimeout(() => {
                setCurrentStep(2);
            }, 1500);
        } else if (currentStep === 2) {
            setTimeout(() => {
                closeModal();
                onSuccess();
            }, 4500);
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
                    <div><video className='red-check' autoPlay loop muted><source src={checkmark} type="video/mp4" /></video></div>
                </div>
            )}
        </>
    );
}


export default BookingModal;
