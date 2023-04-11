import './SearchBar.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsFilterThunk } from "../../store/spots";
import { useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";
import { getKey } from '../../store/maps';
import { Wrapper } from "@googlemaps/react-wrapper";

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

const GOOGLE_MAPS_LIBRARIES = ["places"];

const SearchBar = () => {
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const key = useSelector((state) => state.Maps.key);

    const handleChange = (value) => {
        setAddress(value);
    };

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        const { city, state, country } = results[0].address_components.reduce(
            (acc, component) => {
                const type = component.types[0];
                if (type === "locality") {
                    acc.city = component.long_name;
                } else if (type === "administrative_area_level_1") {
                    acc.state = component.long_name;
                } else if (type === "country") {
                    acc.country = component.long_name;
                }
                return acc;
            },
            {}
        );

        setAddress(value);
        dispatch(getSpotsFilterThunk({ city, state, country }));
        navigate("/search");
    };


    // useEffect(() => {
    //     if (!key) {
    //         dispatch(getKey());
    //     }
    // }, [dispatch, key]);

    // const { isLoaded } = useJsApiLoader({
    //     id: "google-map-script",
    //     googleMapsApiKey: key,
    //     libraries: GOOGLE_MAPS_LIBRARIES,
    // });

    // if (!key || !isLoaded) {
    //     return null;
    // }

    return (
        <>
            <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} libraries={["places"]}>
                <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input {...getInputProps({ placeholder: "Search City" })} />

                            <div>
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion, i) => {
                                    return (
                                        <div key={i} {...getSuggestionItemProps(suggestion)}>
                                            {suggestion.description}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </Wrapper>
        </>
    );
};

export default SearchBar;
