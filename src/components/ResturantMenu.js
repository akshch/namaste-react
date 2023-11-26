import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import { Menu_API } from '../utils/constants';


const ResturantMenu = () => {

  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();


  useEffect(() => {
    fetchMenu();
  },[]);


  const fetchMenu = async () => {
    const data = await fetch(Menu_API+resId);

    const json = await data.json();
       setResInfo(json?.data)
  }

    if (resInfo === null) return <Shimmer/>

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[0]?.card?.card?.info;
    const { itemCards } = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  return (<div> 
      <h2>{name}</h2><p>{cuisines.join(', ')}</p><p>{costForTwoMessage}</p>
    <ul>
      {itemCards.map(item => <li key={item.card.info.id}>{item.card.info.name} - Rs {item.card.info.price/100}</li>)}
    </ul>
  </div>)
};

export default ResturantMenu;