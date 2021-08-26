import React from "react";
import Restaurant from './Restaurant'

const RestaurantList = ({
  selectRestaurant,
  selectedRestaurant,
  restaurants,
  deleteRestaurant
}) => {
  return (
    <div id="restaurants">
      {restaurants.map((restaurant) => {
        return (
          <Restaurant
            key={restaurant.id}
            restaurant={restaurant}
            selectedRestaurant={selectedRestaurant}
            selectRestaurant={selectRestaurant}
            deleteRestaurant={deleteRestaurant}
          />
        );
      })}
    </div>
  );
};

export default RestaurantList;
