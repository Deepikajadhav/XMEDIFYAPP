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
const api = "https://meddata-backend.onrender.com";
const allCity = "https://meddata-backend.onrender.com/cities/:state (e.g., https://meddata-backend.onrender.com/cities/Alaska)";

const SearchBar = props => {
    //const
    const { customClass, atBookingsPage, atHomePage } = props;
    //contexts
    const [bookings, setBookings] = useContext(BookingsContext);
    const [foundHospitals, setFoundHospitals] = useContext(FoundHospitalsContext);
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
    const [fetchingHospitals, setFetchingHospitals] = useState(false);
    const [showStateDropdown, setShowStateDropdown] = useState(false);
    const [showCityDropdown, setShowCityDropdown] = useState(false); 
    
    
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
    axios
    .get(`${api}/states`)
    .then(res => {
      setAllStates(res.data);
    })
    .catch(err => {
      console.error("Failed to fetch states:", err);
      setAllStates([]); // prevent crash
    });
   }, []); 

    //functions
      const handleSubmit = (e) => {
//       e.preventDefault();

//      if (stateName && cityName) {
//      navigate(`/find?state=${stateName}&city=${cityName}`); 
//   }  

         if (!state || !city) return;

    navigate("/find", {
      state: {
        selectedState: state,
        selectedCity: city
      }
    });
  };

    const getLocationData = async (dataType, location) => {
        if(dataType == "cities") {
            fetchingCities.current = true;
            const cities = await axios.get(`${api}/cities/${location}`);
            setAllCities(cities.data);
            fetchingCities.current = false;
            setDisableCityInput(undefined);
        } 
        
        if(dataType === "hospitals")  {
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
            setShowStateDropdown(true);
            cityName_onChange.current = false;
            setCityName("")
        }

        if(name === "city"){
            cityName_onChange.current = true;
            setCityName(value);
            setShowCityDropdown(true);
        }

        if(name === "hospitalName") {
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

        useEffect(() => {
       if (allStates.length && showStateDropdown) {
         setFilteredStates(allStates);
         }
       }, [allStates, showStateDropdown]);


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
                <div id="state" className="dropdownInput"  
                onClick={() => {
                setShowStateDropdown(true);
                setFilteredStates(allStates); // show all states
                 }}> 
                <input 
                type='text' 
                value={stateName} 
                name='state' 
                onChange={handleChange}
                placeholder='state' 
                readOnly
                onClick={(e) => {
                e.preventDefault();          // 🔥 stops form submit
                setShowStateDropdown(true);  // ✅ just show dropdown
                }}
                />
                </div>
                {showStateDropdown && (
                <SearchPop locations={filteredStates} 
                 clickFunction = {(state) =>{clickStateSuggestions(state);
                 setShowStateDropdown(false);
                }}
                />
                )}
            </span>
            
            <span className={`inputWrapper ${disableCityInput}`}>
            <img src={fetchingCities.current ? loadingIcon : location} className={fetchingCities.current ? 'rotateLoad' : null}/> 
                <div id="city" className="dropdownInput" 
                onClick={() => {
                setShowCityDropdown(true);
                setFilteredCities(allCities); // show all states
                }}> 
                <input 
                type='text' 
                value={cityName} 
                name='city' 
                onChange={handleChange}
                placeholder={fetchingCities.current ? "Fetching cities..." :'city'}
                disabled={!displayInputs || fetchingCities.current}  
                readOnly
                onClick={(e) => {
                e.preventDefault();          // 🔥 stops form submit
                setShowCityDropdown(true);  // ✅ just show dropdown
                }}
                /> 
                </div>
                {showCityDropdown && (
                <SearchPop locations={filteredCities} 
                clickFunction = { (city) => { clickCitySuggetions(city);
                 setShowCityDropdown(false); }}
                  />
                  )}
            </span>
          </>
        )
    }

    return ( 

        <form onSubmit={handleSubmit} className={`SearchBar ${customClass}`}>
            {displayInputs()}

            <Button
            type="submit" 
            formSubmit="true" 
            text={fetchingHospitals ? "Fetching..." : "Search" }
            icon={fetchingHospitals ? loadingIcon : searchIcon} 
            buttonClass={"longButton"}
            rotateIcon={fetchingHospitals ? true : false}
            />
        </form>
    );
};

export default SearchBar; 

