import React, { useEffect, useState } from 'react';
import Calender from 'react-calendar';
import { getBookingsForSpotThunk } from '../../store/bookings';
import './SpotCalendar.css';
import 'react-calendar/dist/Calendar.css';

import { useDispatch, useSelector } from 'react-redux';


const SpotCalendar = ({ spotId, spotBookings, setStartDate, setEndDate, value, onChange, reservedDates }) => {

  const dispatch = useDispatch();
  const selectRange = true;
  const calendarType = "US";
  const tileDisabled = ({activeStartDate, date, view }) => (date.getTime() < ((new Date).getTime() - 86400000))
  || (reservedDates.includes(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`))

  useEffect(() => {
    dispatch(getBookingsForSpotThunk(spotId));
}, [dispatch, spotId]);

  useEffect(() => {
      setStartDate(value[0]);
      setEndDate(value[1]);
  },[value])

  const minDetail = 'month';

  return (
    <div className='calendar-container'>
      <Calender
      selectRange={selectRange}
      onChange={onChange}
      value={value}
      calendarType={calendarType}
      tileDisabled={tileDisabled}
      minDetail={minDetail}
       />
    </div>
  );
}

export default SpotCalendar;
