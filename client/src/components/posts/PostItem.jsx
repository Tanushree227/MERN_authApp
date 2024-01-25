/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./PostItem.module.css";
import FavoritesContext from '../../store/favorites-context';

function PostItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const [itemIsFavorite, setItemIsFavorite] = useState(favoritesCtx.itemIsFavorite(props.id));

  useEffect(() => {
    setItemIsFavorite(favoritesCtx.itemIsFavorite(props.id));
  }, [favoritesCtx, props.id]);

  function toggleFavoritesStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        name: props.name,
        description: props.description,
        image: props.image,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <p>
            <strong>{props.name}</strong>
          </p>
          <p>{props.description}</p>
        </div>
        {<div className={classes.actions}>
          <button onClick={toggleFavoritesStatusHandler}>{itemIsFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
        </div>}
      </Card>
    </li>
  );
}

export default PostItem;
