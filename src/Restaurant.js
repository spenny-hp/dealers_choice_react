import React from "react";

const Restaurant = ({ deleteRestaurant, selectRestaurant, restaurant }) => {
    return (
      <span className="restaurant">
        <h3
          className="restaurantLink"
          onClick={() => selectRestaurant(restaurant)}
        >
          {restaurant.name}
        </h3>
        <h4>{restaurant.address}</h4>
        <button className="delete" onClick={() => deleteRestaurant(restaurant)}>X</button>
        {/* <h6>
          {restaurant.liquor_license === "yes"
            ? "We serve alcohol"
            : "We do not serve alcohol"}
        </h6>
        <h6>
          {restaurant.sidewalk_seating === "yes"
            ? "We have sidewalk seating"
            : "We do not have sidewalk seating"}
        </h6>
        <h6>
          {restaurant.roadway_seating === "yes"
            ? "We have roadway seating"
            : "We do not have roadway seating"}
        </h6> */}
      </span>
    );
  };

  export default Restaurant;