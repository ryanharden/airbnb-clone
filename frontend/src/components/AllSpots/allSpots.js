import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";
import "./allSpots.css";
import SpotIndexItem from "./SpotIndexItem";

const AllSpots = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const allSpots = useSelector((state) => state.Spots.allSpots);
    const allSpotsArr = Object.values(allSpots);

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch]);

    const spotItems = allSpotsArr.map((spot) => {
        return <SpotIndexItem key={spot.id} spot={spot} />
    })

    return (
        <div className="spots-container">
            <ul>
                {spotItems}
            </ul>
        </div>
    )
}

export default AllSpots;
