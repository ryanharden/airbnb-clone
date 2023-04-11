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
    const [isInputFocused, setIsInputFocused] = useState(false);
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

    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} libraries={["places"]}>
            <PlacesAutocomplete
                value={isInputFocused ? address : ""}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className='search-bar-wrapper'>
                        <div className='search-bar-content'>
                            <input className='search-bar-input' {...getInputProps({ placeholder: "Search destinations" })} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} />
                            <div className='search-icon'>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height="12px" width="12px" display="block" stroke="currentcolor" strokeWidth="5.33333" overflow="visible"><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
                            </div>
                        </div>
                        {address.length > 0 && isInputFocused && (<div className='search-bar-suggestions'>
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, i) => {
                                return (
                                    <div className="search-suggestion" key={i} {...getSuggestionItemProps(suggestion)}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                        )}
                    </div>
                )}
            </PlacesAutocomplete>
        </Wrapper>
    );
};

export default SearchBar;
