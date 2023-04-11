import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsFilterThunk, getSpotsThunk } from '../../store/spots';
import { Link, useLocation, useParams } from 'react-router-dom';
import SpotIndexItem from '../SpotsIndexItem/SpotIndexItem';
import FilterBar from '../FilterBar/FilterBar';
import "./SearchSpots.css";

const SearchSpots = () => {
    const dispatch = useDispatch();

    const searchSpots = useSelector(state => state.Spots.searchSpots?.allSpots);
    console.log("searchSpots: ", searchSpots);
    // const searchSpotsArr = Object.values(searchSpots);
    const [loading, setLoading] = useState(true);
    const allSpots = useSelector(state => state.Spots.allSpots);
    // console.log(allSpots);
    const allSpotsArr = Object.values(allSpots);

    const first6Spots = allSpotsArr.slice(0, 6);

    const spotRecs = first6Spots.map((spot) => {
        return <SpotIndexItem key={spot.id} spot={spot} />
    });


    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         await dispatch(getSpotsThunk());
    //         setLoading(false);
    //     };
    //     fetchData();
    // }, [dispatch]);

    let allSpotItems;
    if (searchSpots?.length) {
        allSpotItems = searchSpots?.map(spot => {
            return <SpotIndexItem key={spot.id} spot={spot} />
        });
    };

    if (!allSpotsArr.length) return null;

    if (!searchSpots?.length)
        return (
            <div className='category-container'>
                <FilterBar />
                <div className='category-header'>
                    No nests located here yet!
                </div>
                <div className='no-bookings-header'>
                    Recommended nests for you
                </div>
                <div className='spot-recs-container'>
                    <ul className="spots-wrapper">
                        {spotRecs}
                    </ul>
                </div>
            </div>
        )

    return (
        <div className='spots-container'>
            <FilterBar />
            <ul className="spots-wrapper">
                {allSpotItems}
            </ul>
        </div>
    )
}
export default SearchSpots;
