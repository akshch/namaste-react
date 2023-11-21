import ResturantCard from "./ResturantCard";
import resList from "../utils/mockData";
import { useState } from "react";

const Body = () => {

  // Local State Variable - Super powerful variable

  const [listOfResturants, setListOfResturant] = useState(resList);

  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={() => {
          // Filter logic here
          const filteredList = listOfResturants.filter(res=> res.info.avgRating > 4);
         listOfResturants
         setListOfResturant(filteredList);  
        }}>Top Rated Resturants</button>
      </div>
      <div className="res-container">
        {
          listOfResturants.map((resturant) => (<ResturantCard key={resturant.info.id} resData={resturant}/>))
        } 
      </div>
    </div>
  )
}

export default Body;