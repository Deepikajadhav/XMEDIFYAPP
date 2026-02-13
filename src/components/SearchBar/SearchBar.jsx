import React, { useContext, useEffect, useRef, useState } from 'react';
import axios, { all } from 'axios';
//styles
import "./SearchBar.css"
//assetes
import searchIcon from "../../assets/search.svg"
import location from "../../assets/location.svg"
import loadingIcon from "../../assets/loading.svg";
//components
import Button from '../Button/Button';
import { findLocations, findBookings } from '../../functions/functions';
import SearchPop from './SearchPop';
//components
import { BookingsContext, FoundHospitalsContext } from '../../contexts/AllContexts';

//apis
const api = "https://meddata-backend.onrender.com/states";
const allCity = "https://meddata-backend.onrender.com/cities/:state (e.g., https://meddata-backend.onrender.com/cities/Alaska)";

const SearchBar = props => {
    //const
    const { customClass, atBookingsPage, atHomePage } = props;
    //contexts
    const [bookings, setBookings] = useContext(BookingsContext)
    const [foundHospitals, setFoundHospitals] = useContext(FoundHospitalsContext)
    //states
    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [filteredStates, setFilteredStates] = useState([]);
    const [allStates, setAllStates] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [disableCityInput, setDisableCityInput] = useState(undefined);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [fetchingHospitals, setFetchingHospitals] = useState(false)
    //refs
    const stateName_onChange = useRef(false);
    const cityName_onChange = useRef(false);
    const fetchingCities = useRef(false);
    //side effects
    useEffect(()=> {
        if(stateName_onChange.current) filterStatesFunc();
    }, [stateName])

    useEffect(()=> {
        if(cityName_onChange.current) filterCitiesFunc();
    }, [cityName])

    useEffect(() => {
        filterBookingsFunc();
    }, [hospitalName]) 

    useEffect(() => {
                      axios.get(`${api}/states`).then(res => {
                      setAllStates(res.data);
                      });
                    }, []);


    //functions
    const handleSubmit = async event => {
        event.preventDefault();
        
        // if(atBookingsPage) return filterBookingsFunc();

        getLocationData("hospitals")
        
    }

    const getLocationData = async (dataType, location) => {
        if(dataType == "cities"){
            fetchingCities.current = true;
            const cities = await axios.get(`${api}/cities/${location}`);
            setAllCities(cities.data);
            fetchingCities.current = false;
            setDisableCityInput(undefined);
        }
        if(dataType === "hospitals"){
            setFetchingHospitals(true);
            const hospitals = await axios.get(`${api}/data?state=${stateName}&city=${cityName}`);

            setFoundHospitals({hospitals: hospitals.data, cityName, stateName});
            setFetchingHospitals(false);
        }
    }
    const handleChange = event => {
        const {value, name} = event.target;
        
        if(name === "state"){
            stateName_onChange.current = true;
            setStateName(value)
            setDisableCityInput("disableCityInput");
            cityName_onChange.current = false;
            setCityName("")
        }

        if(name === "city"){
            cityName_onChange.current = true;
            setCityName(value)
        }

        if(name === "hospitalName"){
            setHospitalName(value);
        }
    }
    const filterStatesFunc = () => {
        
        let foundStates = findLocations(allStates, stateName);
        setFilteredStates(foundStates);
    }

    const filterCitiesFunc = () => {
        
        let foundCities = findLocations(allCities, cityName);
        setFilteredCities(foundCities);
    }

    const filterBookingsFunc = () => {
        
        let hospitals = findBookings(bookings, hospitalName);
        // console.log(hospitals);
        setFilteredHospitals(hospitals);
    }

    const clickStateSuggestions = (nameOfState) => {
        setFilteredStates([]);
        stateName_onChange.current = false;
        
        setStateName(nameOfState)

        getLocationData("cities", nameOfState);
    }
    const clickCitySuggetions = (nameOfCity) => {
        setFilteredCities([]);
        cityName_onChange.current = false;
        
        setCityName(nameOfCity)
    }

    const displayInputs = () => {
        if(atBookingsPage){
            return (
            <span className='inputWrapper'>
                <img src={location}/>
                <input 
                type='text' 
                value={hospitalName} 
                name='hospitalName' 
                onChange={handleChange}
                placeholder='Search By Hospital'
                id='hospitalName'
                required
                />
                <SearchPop atBookingsPage={true} hospitals={filteredHospitals} clickFunction={clickStateSuggestions}/>
            </span>
        )
    }
        return( 
            <>
            <span className='inputWrapper'>
                <img src={location}/>
                <input 
                type='text' 
                value={stateName} 
                name='state' 
                onChange={handleChange}
                placeholder='state'
                id='state'
                required
                />
                <SearchPop locations={filteredStates} clickFunction={clickStateSuggestions}/>
            </span>
            
            <span className={`inputWrapper ${disableCityInput}`}>
                <img src={fetchingCities.current ? loadingIcon : location} className={fetchingCities.current ? 'rotateLoad' : null}/>
                <input 
                type='text' 
                value={cityName} 
                name='city' 
                onChange={handleChange}
                placeholder={fetchingCities.current ? "Fetching cities..." :'city'}
                required
                disabled={!displayInputs || fetchingCities.current}
                />
                <SearchPop locations={filteredCities} clickFunction={clickCitySuggetions}/>
            </span>
            </>
        )
    }

    return (
        <form onSubmit={handleSubmit} className={`SearchBar ${customClass}`}>
            {displayInputs()}

            <Button 
            formSubmit="true" 
            text={fetchingHospitals ? "Fetching..." : "search" }
            icon={fetchingHospitals ? loadingIcon : searchIcon} 
            buttonClass={"longButton"}
            rotateIcon={fetchingHospitals ? true : false}
            />
        </form>
    );
};

export default SearchBar; 


// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import "./SearchBar.css";
// import Button from "../Button/Button";
// import searchIcon from "../../assets/search.svg";
// import loadingIcon from "../../assets/loading.svg";
// import { FoundHospitalsContext } from "../../contexts/AllContexts";

// const api = "https://meddata-backend.onrender.com";

//   const SearchBar = ({ customClass }) => {
//   const [, setFoundHospitals] = useContext(FoundHospitalsContext);

//   const [allStates, setAllStates] = useState([]);
//   const [allCities, setAllCities] = useState([]);

//   const [stateName, setStateName] = useState("");
//   const [cityName, setCityName] = useState("");

//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loadingHospitals, setLoadingHospitals] = useState(false); 

//   const [showStates, setShowStates] = useState(false);
//   const [showCities, setShowCities] = useState(false);


//   // Fetch states on load
//   useEffect(() => {
//     const fetchStates = async () => {
//       const res = await axios.get(`${api}/states`);
//       setAllStates(res.data);
//       setShowStates(true);
//     };
//     fetchStates();
//   }, []);

//   // Fetch cities when state changes
//   useEffect(() => {
//     if (!stateName) return;

//     const fetchCities = async () => {
//       setLoadingCities(true);
//       const res = await axios.get(`${api}/cities/${stateName}`);
//       setAllCities(res.data);
//       setShowCities(true);
//       setLoadingCities(false);
//     };

//     fetchCities();
//   }, [stateName]);

//     const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stateName || !cityName) return;

//     setLoadingHospitals(true);
//     const res = await axios.get(
//       `${api}/data?state=${stateName}&city=${cityName}`
//     );

//     setFoundHospitals({
//       hospitals: res.data,
//       stateName,
//       cityName,
//     });

//     setLoadingHospitals(false);
//   };


//   return (
//     <form onSubmit={handleSubmit} className={`SearchBar ${customClass}`}>

//       {/* State Dropdown */} 
//       <div id="state" className="dropdown-container"> 
//         <div className="dropdown-input" data-testid="state-dropdown" onClick={() => setShowStates(true)}>
//         {stateName || "Select State"}
//      </div> 
//       {showStates && allStates.length > 0 &&(
//     <ul className="dropdown-list">
//       {allStates.map((state, index) => (
//         <li
//           key={index}
//           onClick={() => {
//             setStateName(state);
//             setShowStates(false);
//             setCityName("");
//             setAllCities([]);
//           }}
//         >
//           {state}
//         </li>
//       ))}
//     </ul>
//   )}  
//       </div>

//       {/* City Dropdown */} 
//       <div id="city" className="dropdown-container"> 

//         <div
//            className={`dropdown-input ${!stateName ? "disabled" : ""}`}
//            data-testid="city-dropdown"
//            onClick={() => stateName && setShowCities(!showCities)}>

//          {cityName || "Select City"}
//      </div> 
//      {showCities && (
//     <ul className="dropdown-list">
//       {allCities.map((city, index) => (
//         <li
//           key={index}
//           onClick={() => {
//             setCityName(city);
//             setShowCities(false);
//           }}
//         >
//           {city}
//         </li>
//       ))}
//     </ul>
//   )}

//       </div>

//       <Button 
//         id="searchBtn"
//         formSubmit="true"
//         text={loadingHospitals ? "Fetching..." : "Search"}
//         icon={loadingHospitals ? loadingIcon : searchIcon}
//         buttonClass="longButton"
//         rotateIcon={loadingHospitals}
//       />
//     </form>
//   );
// };

// export default SearchBar;
