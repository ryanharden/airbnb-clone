import { Wrapper } from "@googlemaps/react-wrapper"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const HomeMap = ({
    spots,
    highlightedSpot,
    mapOptions = {},
    mapEventHandlers = {},
    markerEventHandlers = {}
}) => {
    let {about} = useParams()
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});
    const navigate = useNavigate();
    let parsed = JSON.parse(about)

    useEffect(() => {
        if(!map){
            setMap(new window.google.maps.Map(mapRef.current, {
                mapId: '1780086019de472',
                zoom: 0,
                clickableIcons: false,
                disableDefaultUI: true,
                ...mapOptions,
            }))
        }

    }, [mapRef, map, mapOptions]);

    useEffect(() => {
        if(map){
            map.fitBounds(parsed[0].geometry.viewport)
        }
    }, [map, about])

    useEffect(() => {
        if (map) {
            const listeners = Object.entries(mapEventHandlers).map(([event, handler]) =>
                window.google.maps.event.addListener(
                    map,
                    event,
                    (...args) => handler(...args, map)
                )
            );

            return () => listeners.forEach(window.google.maps.event.removeListener);
        }
    }, [map, mapEventHandlers]);

    useEffect(() => {
        if (map) {
            spots.forEach((spot) => {
                if (markers.current[spot.id]) return;

                const marker = new window.google.maps.Marker({
                    map,
                    position: new window.google.maps.LatLng(spot.lat, spot.lng),
                    label: {
                        text: `$${spot.price.toString()}`,
                        fontWeight: 'bold',
                        color: 'black'
                    },
                    icon: {
                        path: `
                            M 1,0
                            L 2,0
                            A 1 1 0 0 1 3,1
                            A 1 1 0 0 1 2,2
                            L 1,2
                            A 1 1 0 0 1 0,1
                            A 1 1 0 0 1 1,0
                            z
                            `,
                        fillOpacity: 1,
                        fillColor: 'white',
                        strokeColor: 'black',
                        strokeWeight: 1,
                        scale: 15,
                        labelOrigin: new window.google.maps.Point(1.5, 1),
                        anchor: new window.google.maps.Point(1.5, 1)
                    },
                });

                Object.entries(markerEventHandlers).forEach(([event, handler]) => {
                    marker.addListener(event, () => handler(spot));
                });
                markers.current[spot.id] = marker;
            })

            Object.entries(markers.current).forEach(([spotId, marker]) => {
                if (spots.some(listing => listing.id.toString() === spotId)) return;

                marker.setMap(null);
                delete markers.current[spotId];
            })
        }
    }, [spots, map, markerEventHandlers]);

    useEffect(() => {
        Object.entries(markers.current).forEach(([spotId, marker]) => {
            const label = marker.getLabel();
            const icon = marker.getIcon();

            if (parseInt(spotId) === highlightedSpot) {
                marker.setLabel({ ...label, color: 'white' });
                marker.setIcon({ ...icon, fillColor: 'black' });
            } else {
                marker.setLabel({ ...label, color: 'black' });
                marker.setIcon({ ...icon, fillColor: 'white' });
            }
        });
    }, [markers, highlightedSpot]);

    return (
        <div ref={mapRef} className="map">
            Map
        </div>
    );
}

export const SearchViewMapWrapper = (props) => {
    return (
        <Wrapper apiKey={process.env.MAPS_API_KEY} libraries={["places"]}>
            <HomeMap {...props}></HomeMap>
        </Wrapper>
    )
}
