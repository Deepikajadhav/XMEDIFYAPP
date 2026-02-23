import React from 'react';
//components
import SearchResults from '../SearchResults/SearchResults';
import FAQ from '../FAQ/FAQ';
import AppTop from '../AppTop/AppTop';
import Navbar from '../Navbar/Navbar';
import { useLocation } from "react-router-dom";

const FindPage = () => { 
    const location = useLocation();

  const selectedState = location.state?.selectedState;
  const selectedCity = location.state?.selectedCity;
    return (
        <>
            <AppTop />  
            <Navbar atFindPage={true} backColor="whiteBack" />

            <SearchResults 
            state={selectedState}
            city={selectedCity} />

            <FAQ />
        </>
    );
};

export default FindPage;