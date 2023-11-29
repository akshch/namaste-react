import ResturantCard from "./ResturantCard";
import { useEffect, useState } from "react";
import Shimmer from './Shimmer'
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {

  // Local State Variable - Super powerful variable

  const [listOfResturants, setListOfResturant] = useState([]);
  const [filteredResturants, setFilteredResturants] = useState([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('useEffect Called')
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2812547&lng=73.0482912&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');

    const json = await data.json();

    // Optional Chaning
   setListOfResturant(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
   setFilteredResturants(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }
  
  const onlineStatus = useOnlineStatus();

  if ( onlineStatus === false) {
    return (<h1>Looks like you're offline. Please check you internet connection!</h1>)
  }

  // Conditional Rendering

  return listOfResturants.length === 0 ? <Shimmer/> : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type="text" className="search-box" value={searchText} onChange={(e) => {
            setSearchText(e.target.value);
          }}></input>
          <button className="search-btn" onClick={() => {
            const filteredResturants = listOfResturants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredResturants(filteredResturants);
          }}
          >
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={() => {
          // Filter logic here
          const filteredList = listOfResturants.filter(res=> res.info.avgRating > 4);
           setListOfResturant(filteredList);  
        }}>Top Rated Resturants</button>
      </div>
      <div className="res-container">
        {
          filteredResturants.map((resturant) => (<Link key={resturant.info.id} to={"resturant/"+resturant.info.id}><ResturantCard resData={resturant}/></Link>))
        } 
      </div>
    </div>
  )
}

export default Body;