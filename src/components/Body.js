import ResturantCard, { withPromotedResturant } from "./ResturantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  // Local State Variable - Super powerful variable

  const [listOfResturants, setListOfResturant] = useState([]);
  const [filteredResturants, setFilteredResturants] = useState([]);

  const [searchText, setSearchText] = useState("");

  const ResturantCardPromoted = withPromotedResturant(ResturantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2812547&lng=73.0482912&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    // Optional Chaning
    setListOfResturant(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredResturants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // console.log(
    //   json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1>Looks like you're offline. Please check you internet connection!</h1>
    );
  }

  const { loggedInUser, setUserName } = useContext(UserContext);
  // Conditional Rendering

  return listOfResturants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex">
        <div className="p-4 m-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="px-4 py-2 m-4 bg-green-100 rounded-lg"
            onClick={() => {
              const filteredResturants = listOfResturants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredResturants(filteredResturants);
            }}
          >
            Search
          </button>
        </div>
        <div className="p-4 m-4 flex items-center">
          <button
            className="px-4 py-4 bg-gray-100 rounded-lg"
            onClick={() => {
              // Filter logic here
              const filteredList = listOfResturants.filter(
                (res) => res.info.avgRating > 4
              );
              setListOfResturant(filteredList);
            }}
          >
            Top Rated Resturants
          </button>
        </div>

        <div className="p-4 m-4 flex items-center">
          <label>Username :</label>
          <input
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredResturants.map((resturant) => (
          <Link key={resturant.info.id} to={"resturant/" + resturant.info.id}>
            {resturant.info.avgRating > 4.4 ? (
              <ResturantCardPromoted resData={resturant} />
            ) : (
              <ResturantCard resData={resturant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
