import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import useResturantMenu from '../utils/useResturantMenu';


const ResturantMenu = () => {

  const { resId } = useParams();
  
  const resInfo = useResturantMenu(resId);

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