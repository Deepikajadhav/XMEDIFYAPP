// // //styles
// // import "./SearchResults.css";
// // //assets
// // import checkIcon from "../../assets/checkBadge.svg"
// // //components
// // import CommonSubText from "../CommonSubText/CommonSubText";
// // import ResultCard from '../ResultCard/ResultCard';
// // //contexts
// // import { FoundHospitalsContext } from '../../contexts/AllContexts'; 
// // import { useSearchParams } from "react-router-dom";
// // import { useEffect, useContext } from "react";
// // import axios from "axios";

// // const headline0 = "Search with State and City name for Hospitals above"
// // const headline = "medical centers available in";
// // const subText = "Book appointments with minimum wait-time & verified doctor details";
// // const SearchResults = () => {
    
// //     //context
// //     const [foundHospitals, setFoundHospitals] = useContext(FoundHospitalsContext);
// //     //functions
// //     const displayCards = () => {
// //         if(!foundHospitals) return null;
// //         if(foundHospitals?.hospitals?.length == 0) return null;  

// //         const [searchParams] = useSearchParams();
// //         const state = searchParams.get("state");
// //         const city = searchParams.get("city");

// //         const [foundHospitals, setFoundHospitals] =
// //         useContext(FoundHospitalsContext); 

// //         useEffect(() => {
// //   if (!state || !city) return;

// //   const fetchHospitals = async () => {
// //     try {
// //       const response = await axios.get(
// //         `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
// //       );

// //       setFoundHospitals({
// //         hospitals: response.data,
// //         stateName: state,
// //         cityName: city,
// //         noSearchYet: false
// //       });
// //     } catch (error) {
// //       console.error("Failed to fetch hospitals", error);
// //     }
// //     };

// //        fetchHospitals();
// //        }, [state, city]);

// //         return foundHospitals.hospitals.map(item => {
// //             // console.log(item["Hospital Name"])
// //             // console.log(item["County Name"])
// //             // console.log(item["City"])
// //             // console.log(item["Hospital overall rating"])
// //             return (
// //                 <ResultCard 
// //                     hospitalName={item["Hospital Name"]}
// //                     county={item["County Name"]}
// //                     city={item["City"]}
// //                     rating={item["Hospital overall rating"]}
// //                     hospitalType={item["Hospital Type"]}
// //                 />
// //             )
// //         });
// //     }
// //     return (
// //         <div className='SearchResults' >
// //             <div className='commonContainer resultsBody'>
// //                 <div className='resultsHead'>
// //                     <h1>{foundHospitals.noSearchYet ? headline0 : `${foundHospitals?.hospitals?.length} medical centers available in ${foundHospitals?.stateName}`}</h1>
// //                     <p>
// //                         <img src={checkIcon} alt='check icon' className='checkIcon'/>
// //                         <span>{subText}</span>
// //                     </p>
// //                 </div>
// //                 <div className='cardAndSensodyne'>
// //                     <aside className='resultCardsArray'>
// //                         {/* <ResultCard /> */}
// //                         {displayCards()}
// //                     </aside>
// //                     <aside className='sensodyne'></aside>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SearchResults;
 

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


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const location = useLocation();

  const state = location.state?.selectedState;
  const city = location.state?.selectedCity;

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state || !city) {
      console.log("State or city missing", state, city);
      return;
    }

    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
        );
        setHospitals(res.data);
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [state, city]);

  if (!state || !city) {
    return <p style={{ textAlign: "center" }}>No search data found</p>;
  }

  if (loading) return <p style={{ textAlign: "center" }}>Loading hospitals...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>
        Hospitals in {city}, {state}
      </h2>

      {hospitals.length === 0 ? (
        <p>No hospitals found</p>
      ) : (
        hospitals.map((h, index) => (
          <div key={h["Hospital Name"] + index}>
            <h3>{h["Hospital Name"]}</h3>
            <p>{h.Address}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;