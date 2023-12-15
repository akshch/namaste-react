import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const ResturantCard = (props) => {
  const { resData } = props;
  const { loggedInUser } = useContext(UserContext);

  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    resData?.info;
  const { deliveryTime } = resData.info.sla;
  return (
    <div className="m-4 p-4 w-[250px] bg-gray-100 rounded-lg">
      <img
        alt="res-logo"
        className="rounded-lg"
        src={CDN_URL + resData.info.cloudinaryImageId}
      ></img>
      <h3 className="py-4 font-bold text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{deliveryTime} minutes</h4>
      <h4>User : {loggedInUser}</h4>
    </div>
  );
};

// Higher Order Component

// input - REsturantCard ==>> ResturantCardPromoted

export const withPromotedResturant = (ResturantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Best Seller
        </label>
        <ResturantCard {...props} />
      </div>
    );
  };
};

export default ResturantCard;
