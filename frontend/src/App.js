import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import AllSpots from "./components/AllSpots/allSpots";
import SpotShow from "./components/SpotShow/SpotShow";
import TripsPage from "./components/TripsPage/TripsPage";
import CategorySpots from "./components/CategorySpots/CategorySpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const isLoggedIn = useSelector(state => state.session.user != null);

  useEffect(() => {
    if (!isLoggedIn)  {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Routes>
          <Route path="/" element={<AllSpots />} />

          <Route path="/:category" element={<CategorySpots />} />

          <Route path="/spots/:spotId" element={<SpotShow />} />

          <Route path="/bookings/current" element={<TripsPage />} />


        </Routes>
      )}
    </>
  );
}

export default App;
