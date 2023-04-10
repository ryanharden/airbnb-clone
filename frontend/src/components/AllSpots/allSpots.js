import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";
import "./allSpots.css";
import SpotIndexItem from "../SpotsIndexItem/SpotIndexItem";
import FilterBar from "../FilterBar/FilterBar";

const AllSpots = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => state.Spots.allSpots);
    const allSpotsArr = Object.values(allSpots);

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch]);

    if (!allSpots) return null;

    const spotItems = allSpotsArr.map((spot) => {
        return <SpotIndexItem key={spot.id} spot={spot} />
    })

    return (
        <div className="spots-container">
            <FilterBar />
            <ul className="spots-wrapper">
                {spotItems}
            </ul>
        </div>
    )
};

export default AllSpots;
