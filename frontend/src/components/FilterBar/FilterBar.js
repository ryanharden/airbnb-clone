import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./FilterBar.css";

const FilterBar = () => {
    return (
        <div className='links-bar-wrapper'>
            <div className='link-bar-link-container'>
                <Link to={'/'} className='links-bar-link'>
                    <img className="f-bar-img" src="https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg" />
                    <div className='f-bar-cat'>All</div>
                </Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Beach'} className="links-bar-link">
                    <img className="f-bar-img" src="https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg" />
                    <div className='f-bar-cat'>Beach</div>
                </Link>
            </div>
            <div className='link-bar-link-container-cabin'>
                <Link to={'/Cabin'} className='links-bar-link'>
                    <img className="f-bar-img" src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" />
                    <div className='f-bar-cat'>Cabin</div>
                </Link>
            </div>
            <div className='link-bar-link-container-camping'>
                <Link to={'/Camping'} className='links-bar-link'>
                    <img className="f-bar-img" src="https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg" />
                    <div className='f-bar-cat'>Camping</div>
                </Link>
            </div>
            <div className='link-bar-link-container-countryside'>
                <Link to={'/Countryside'} className='links-bar-link'>
                    <img className="f-bar-img" src="https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg" />
                    <div className='f-bar-cat'>Countryside</div>
                </Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Desert'} className='links-bar-link'>
                    <img className="f-bar-img" src="https://a0.muscache.com/pictures/a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg" />
                    <div className='f-bar-cat'>Desert</div>
                </Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Lake'} className='links-bar-link'>
                    <img className="f-bar-img" src="https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg" />
                    <div className='f-bar-cat'>Lake</div>
                </Link>
            </div >
            <div className='link-bar-link-container-parks'>
                <Link to={'/NationalParks'} className='links-bar-link'>
                    <img className="f-bar-img" src="https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg" />
                    <div className='f-bar-cat'>National Parks</div>
                </Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Tropical'} className='links-bar-link'>
                    <img className="f-bar-img" src=" https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg" />
                    <div className='f-bar-cat'>Tropical</div>
                </Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Vineyard'} className='links-bar-link'>
                    <img className="f-bar-img" src="https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg" />
                    <div className='f-bar-cat'></div>Vineyard
                </Link>
            </div>
            {/* <div className='link-bar-link-container'>
                <a target="_blank" rel="noreferrer" className='my-links' href="https://www.linkedin.com/in/ryanharden-dev">LinkedIn</a>
            </div>
            <div className='link-bar-link-container'>
                <a target="_blank" rel="noreferrer" className='my-links' href="https://github.com/ryanharden">Github</a>
            </div> */}
        </div >
    )
}
export default FilterBar;
