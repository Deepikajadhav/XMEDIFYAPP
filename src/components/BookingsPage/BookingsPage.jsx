import React from 'react';
import { Route, Routes } from 'react-router-dom';
//components
import Bookings from '../Bookings/MyBookings';
import AppTop from '../AppTop/AppTop';
import Navbar from '../Navbar/Navbar';

const BookingsPage = () => {
    return (
        <>
            <AppTop />  
            <Navbar atBookingsPage={true} backColor="whiteBack" />
            
            {/* <Bookings />  */}
            <Routes>
            <Route path="/my-bookings" element={<Bookings />} /> 
            </Routes>
        </>
    );
};

export default BookingsPage;