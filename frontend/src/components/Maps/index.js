import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';

import { getKey } from '../../store/maps';
import Maps from './Maps';

const GOOGLE_MAPS_LIBRARIES = ["places"];

const MapContainer = ({spots}) => {
  const key = useSelector((state) => state.Maps.key);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!key) {
  //     dispatch(getKey());
  //   }
  // }, [dispatch, key]);

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: key,
  //   libraries: GOOGLE_MAPS_LIBRARIES,
  // });

  // if (!key || !isLoaded) {
  //   return null;
  // }

  return (
    <Maps spots={spots} />
  );
};

export default MapContainer;
