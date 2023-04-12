import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DemoUser.css";

function DemoUser() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [credential] = useState("DemoUser");
    const [password] = useState("password");

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
    };

    return (
        <button onClick={handleSubmit} className="demo-log-in" type="submit">Demo User</button>
    )
}

export default DemoUser
