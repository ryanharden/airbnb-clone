import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";
import "./allSpots.css";
import { useParams, useNavigate } from "react-router-dom";
import SpotIndexItem from "../SpotsIndexItem/SpotIndexItem";
import FilterBar from "../FilterBar/FilterBar";
import Maps from "../Maps/Maps";
import { getKey } from '../../store/maps';

import { SearchViewMapWrapper } from "../HomeMap/HomeMap";

const AllSpots = () => {
    // const { about } = useParams();
    // const navigate = useNavigate();
    // const parsed = JSON.parse(about)
    // const [bounds, setBounds] = useState(`${parsed[0].geometry.bounds.south}, ${parsed[0].geometry.bounds.west}, ${parsed[0].geometry.bounds.north}, ${parsed[0].geometry.bounds.east}`)
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => state.Spots.allSpots);
    const allSpotsArr = Object.values(allSpots);
    const [showMap, setShowMap] = useState(false)
    const key = useSelector((state) => state.Maps.key);

    useEffect(() => {
        dispatch(getSpotsThunk())

    }, [dispatch]);

    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
    }, [dispatch, key]);

    if (!key) {
        return null;
    }

    const switchView = () => {
        if (showMap === true) {
            setShowMap(false)
        } else {
            setShowMap(true)
        }
    }
    // const mapEventHandlers = useMemo(() => ({
    //     idle: map => setBounds(map.getBounds().toUrlValue())
    // }), [navigate])

    if (!allSpots) return null;

    const spotItems = allSpotsArr.map((spot) => {
        return <SpotIndexItem key={spot.id} spot={spot} />
    })

    return (
        <div className="spots-container">
            <FilterBar />
            <div className="switch-button-wrapper">
                <div className="switch-button-container">
                    <button onClick={switchView}>{showMap ? <p>Show menu<i className="fa-solid fa-list-ul fa-show"></i></p> : <p>Show map<i className="fa-solid fa-map fa-show"></i></p>}</button>
                </div>
            </div>
            {showMap ? (
                <div className="spots-map-container">
                    <Maps apiKey={key} spots={allSpotsArr} />
                </div>) : (
                <ul className="spots-wrapper">
                    {spotItems}
                </ul>
            )
            }

            {/* <SearchViewMapWrapper spots={allSpotsArr} markerEventHandlers={{
                click: (spot) => navigate(`/spots/${spot.id}`),
            }}
                mapEventHandlers={mapEventHandlers} /> */}
        </div>
    )
};

export default AllSpots;
