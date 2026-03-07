// //styles
import "./SearchResults.css";
//assets
import checkIcon from "../../assets/checkBadge.svg"
//components
import CommonSubText from "../CommonSubText/CommonSubText";
import ResultCard from '../ResultCard/ResultCard';
//contexts
import { FoundHospitalsContext } from '../../contexts/AllContexts'; 
import { useSearchParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";

const headline0 = "Search with State and City name for Hospitals above"
const headline = "medical centers available in";
const subText = "Book appointments with minimum wait-time & verified doctor details";
const SearchResults = () => {
    
    //context
    const [foundHospitals, setFoundHospitals] = useContext(FoundHospitalsContext);
    //functions
    const displayCards = () => {
        if(!foundHospitals) return null;
        if(foundHospitals?.hospitals ?. length == 0) return null;  

        const [searchParams] = useSearchParams();
        const state = searchParams.get("state");
        const city = searchParams.get("city");

        useEffect(() => {
  if (!state || !city) return;

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(
        `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
      );

      setFoundHospitals({
        hospitals: response.data,
        stateName: state,
        cityName: city,
        noSearchYet: false
      });
    } catch (error) {
      console.error("Failed to fetch hospitals", error);
    }
    };  

    <pre>{JSON.stringify(foundHospitals, null, 2)}</pre>

       fetchHospitals();
       }, [state, city]);

        return foundHospitals.hospitals.map(item => {
             console.log(item["Hospital Name"])
             console.log(item["County Name"])
             console.log(item["City"])
            console.log(item["Hospital overall rating"])
            return (
                <ResultCard 
                    hospitalName={item["Hospital Name"]}
                    county={item["County Name"]}
                    city={item["City"]}
                    rating={item["Hospital overall rating"]}
                    hospitalType={item["Hospital Type"]}
                />
            )
        });
    }
    return (
        <div className='SearchResults' >
            <div className='commonContainer resultsBody'>
                <div className='resultsHead'>
                    <h3>{foundHospitals.noSearchYet ? headline0 : `${foundHospitals?.hospitals?.length} medical centers available in ${foundHospitals?.stateName}`}</h3>
                    <p>
                        <img src={checkIcon} alt='check icon' className='checkIcon'/>
                        <span>{subText}</span>
                    </p>
                </div>
                <div className='cardAndSensodyne'>
                    <aside className='resultCardsArray'>
                        {/* <ResultCard /> */}
                        {displayCards()}
                    </aside>
                    <aside className='sensodyne'></aside>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
 

// import { useContext, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { FoundHospitalsContext } from "../../contexts/AllContexts";
// import ResultCard from "../ResultCard/ResultCard";

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const state = searchParams.get("state");
//   const city = searchParams.get("city");

//   const [foundHospitals, setFoundHospitals] =
//     useContext(FoundHospitalsContext);

//   useEffect(() => {
//     if (!state || !city) return;

//     const fetchHospitals = async () => {
//       try {
//         const response = await axios.get(
//           `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
//         );

//         setFoundHospitals({
//           hospitals: response.data,
//           stateName: state,
//           cityName: city,
//           noSearchYet: false,
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchHospitals();
//   }, [state, city]);

//   const displayCards = () => {
//     if (!foundHospitals?.hospitals?.length) return null;

//     return foundHospitals.hospitals.map((item, index) => (
//       <ResultCard
//         key={`${item["Hospital Name"]}-${index}`}
//         hospitalName={item["Hospital Name"]}
//         county={item["County Name"]}
//         city={item["City"]}
//         rating={item["Hospital overall rating"]}
//         hospitalType={item["Hospital Type"]}
//       />
//     ));
//   };

//   return (
//     <div className="SearchResults">
//       {displayCards()}
//     </div>
//   );
// };

// export default SearchResults;  



// import { useSearchParams } from "react-router-dom";
// import { useEffect, useContext } from "react";
// import axios from "axios";
// import { FoundHospitalsContext } from "../../contexts/AllContexts";
// import ResultCard from "../ResultCard/ResultCard";

//   const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const state = searchParams.get("state");
//   const city = searchParams.get("city");

//   const [foundHospitals, setFoundHospitals] =
//     useContext(FoundHospitalsContext);

//   useEffect(() => {
//     if (!state || !city) {
//       console.warn("State or city missing", state, city);
//       return;
//     }

//     const fetchHospitals = async () => {
//       try {
//         const response = await axios.get(
//           `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
//         );

//         setFoundHospitals({
//           hospitals: response.data,
//           stateName: state,
//           cityName: city,
//           noSearchYet: false,
//         });
//       } catch (error) {
//         console.error("Failed to fetch hospitals", error);
//       }
//     };

//     fetchHospitals();
//   }, [state, city, setFoundHospitals]);

//   const displayCards = () => {
//     if (!foundHospitals?.hospitals?.length) {
//       return <p>No hospitals found</p>;
//     }

//     return foundHospitals.hospitals.map((item, index) => (
//       <ResultCard
//         key={`${item["Hospital Name"]}-${index}`}
//         hospitalName={item["Hospital Name"]}
//         county={item["County Name"]}
//         city={item["City"]}
//         rating={item["Hospital overall rating"]}
//         hospitalType={item["Hospital Type"]}
//       />
//     ));
//   };

//   return (
//     <div className="SearchResults">
//       {displayCards()}
//     </div>
//   );
// };

// export default SearchResults;