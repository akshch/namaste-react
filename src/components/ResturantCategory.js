import { useState } from "react";
import ItemList from "./ItemList";

const ResturantCategory = ({ data, showItems, setShowIndex }) => {
  // const [showItem, setShowItem] = useState(false);

  const handleClick = () => {
    setShowIndex();
  };
  return (
    <div>
      {/* Header */}
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>Down Arrow</span>
        </div>
        {showItems && <ItemList items={data.itemCards} />}
      </div>
      {/* Accordion Body */}
    </div>
  );
};

export default ResturantCategory;
