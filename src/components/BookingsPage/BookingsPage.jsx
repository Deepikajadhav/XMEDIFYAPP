import React from 'react';
import { Route, Routes } from 'react-router-dom';
//components
import Mybookings from '../Bookings/my-bookings';
import AppTop from '../AppTop/AppTop';
import Navbar from '../Navbar/Navbar';

const BookingsPage = () => {
    return (
        <>
            <AppTop />  
            <Navbar atBookingsPage={true} backColor="whiteBack" />
            <Routes>
            <Route path="/my-bookings" element={<Mybookings />} /> 
            </Routes>
        </>
    );
};

export default BookingsPage;