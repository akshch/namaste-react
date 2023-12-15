import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useResturantMenu from "../utils/useResturantMenu";
import ResturantCategory from "./ResturantCategory";
import { useState } from "react";

const ResturantMenu = () => {
  const { resId } = useParams();

  const resInfo = useResturantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;
  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  console.log(
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
  );

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log('categories', categories);

  return (
    <div className="text-center">
      <h2 className="font-bold my-6 text-2xl">{name}</h2>
      <p className="font-bold text-lg">{cuisines.join(", ")}</p>
      <p>{costForTwoMessage}</p>
      {/* <ul> */}
      {/* {itemCards.map(item => <li key={item.card.info.id}>{item.card.info.name} - Rs {item.card.info.price/100}</li>)} */}
      {categories.map((category, index) => (
        // controlled component
        <ResturantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
      {/* </ul> */}
    </div>
  );
};

export default ResturantMenu;
