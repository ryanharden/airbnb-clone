import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { parsePath, useNavigate } from 'react-router-dom';
import { Wrapper } from "@googlemaps/react-wrapper";

const containerStyle = {
    width: '100%',
    height: '100%',
};

const getCustomMarkerIcon = (price) => {
    const svg = `<svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" width="50" height="30">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="150%" height="140%">
        <feDropShadow dx="5" dy="5" stdDeviation="2" flood-color="rgba(0, 0, 0, 0.3)" />
      </filter>
    </defs>
      <rect width="150px" height="80px" rx="38" ry="38" fill="white" stroke="white" />
      <text font-family="'Circular', -apple-system, 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', sans-serif" x="49%" y="65%" font-size="35" font-weight="bold" text-anchor="middle" fill="black">${price}</text>
    </svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const center = {
    lat: 38.3332,
    lng: -123.0481,
};


const Maps = ({ apiKey, isLoaded, spots, center, zoom, spot = null }) => {
    const navigate = useNavigate();

    const handleMarkerClick = (spotId) => {
        navigate(`/spots/${spotId}`);
    };

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: apiKey,
    //     libraries: GOOGLE_MAPS_LIBRARIES,
    // });
    const createMarker = (spot) => (
        <Marker
            key={spot.id}
            position={{ lat: parseFloat(spot.lat), lng: parseFloat(spot.lng) }}
            icon={getCustomMarkerIcon(`$${spot.price}`)}
            onClick={() => handleMarkerClick(spot.id)}
        />
    );
    const markers = spot ? [createMarker(spot)] : spots.map(createMarker);
    return (
        <>
            {/* {isLoaded && ( */}
            <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} libraries={["places"]}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                // fullscreenControl={false}
                >
                    {markers}
                </GoogleMap>
                {/* )} */}
            </Wrapper>
        </>
    );
};

export default React.memo(Maps);
