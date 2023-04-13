import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsThunk } from '../../store/spots';
import { Link, useLocation, useParams } from 'react-router-dom';
import SpotIndexItem from '../SpotsIndexItem/SpotIndexItem';
import FilterBar from '../FilterBar/FilterBar';
import "./CategorySpots.css";

const CategorySpots = () => {
    const dispatch = useDispatch();
    const {category} = useParams();

    const allSpots = useSelector(state => state.Spots.allSpots);
    // console.log(allSpots);
    const allSpotsArr = Object.values(allSpots);

    const categorySpots = allSpotsArr.filter(spot => spot.category.replace(/\s+/g, '') === category)
    const first6Spots = allSpotsArr.slice(0, 6);

    const spotRecs = first6Spots.map((spot) => {
        return <SpotIndexItem key={spot.id} spot={spot} />
    });

    useEffect(() => {
        dispatch(getSpotsThunk());
    }, [dispatch]);

    let allSpotItems;
    if (categorySpots.length) {
        allSpotItems = categorySpots.map(spot => {
            return <SpotIndexItem key={spot.id} spot={spot} />
        });
    };

    if (!allSpotsArr.length) return null;

    if (!categorySpots.length)
        return (
            <div className='category-container'>
                <FilterBar />
                <div className='category-header'>
                    No nests in this category yet!
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
        <div className='category-container'>
            <FilterBar />
            <ul className="spots-wrapper">
                {allSpotItems}
            </ul>
        </div>
    )
}
export default CategorySpots;
