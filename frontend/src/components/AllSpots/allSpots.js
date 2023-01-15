import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";
import "./allSpots.css";
import SpotCard from "./SpotCard";

const AllSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const allSpots = useSelector((state) => state.Spots.allSpots);
    const allSpotsArr = Object.values(allSpots);

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch]);

    return (
        <div className="all-spots-container">
            <div className="spots-grid">
                {allSpotsArr.map(spot => (
                  <SpotCard key={spot.id} spot={spot} />
                ))}
            </div>
        </div>
    )
}

export default AllSpots;
