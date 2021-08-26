// webpack dependency
const regeneratorRuntime = require("regenerator-runtime/runtime");

// react
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

// components
import RestaurantList from "./RestaurantList";
import BoroughList from "./BoroughList";
import Input from "./Input";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      selectedRestaurant: {},
      boroughs: [],
      selectedBorough: {},
    };
    this.selectRestaurant = this.selectRestaurant.bind(this);
    this.selectBorough = this.selectBorough.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
  }
  async addRestaurant() {
    const restaurant = {};
    const name = document.getElementById("name");
    const address = document.getElementById("address");
    const borough_id = document.getElementById("borough_id");
    const liquor_license = document.getElementById("liquor_license");
    const sidewalk_seating = document.getElementById("sidewalk_seating");
    const roadway_seating = document.getElementById("roadway_seating");
    
    console.log("Post function still in progress");

    if (
      name.value &&
      address.value &&
      borough_id.value &&
      liquor_license.value &&
      sidewalk_seating.value &&
      roadway_seating.value
    ) {
      restaurant.name = name.value;
      restaurant.address = address.value;
      restaurant.borough_id = borough_id.value;
      restaurant.liquor_license = liquor_license.value;
      restaurant.sidewalk_seating = sidewalk_seating.value;
      restaurant.roadway_seating = roadway_seating.value;
    } else {
      console.log("Please fill out the entire form");
    }

    const response = await axios.post("/api/restaurants", restaurant);
    
  }

  deleteRestaurant(restaurant) {
    console.log("Still need to code");
  }
  selectRestaurant(restaurant) {
    this.setState({ selectedRestaurant: restaurant });
    console.log(restaurant);
  }
  selectBorough(borough) {
    this.setState({ selectedBorough: borough });
    console.log(restaurant);
  }
  async componentDidMount() {
    const restaurants = await axios.get("/api/restaurants");
    const boroughs = await axios.get("/api/boroughs");
    this.setState({ restaurants: restaurants.data, boroughs: boroughs.data });
  }
  render() {
    const { selectedRestaurant, restaurants, selectedBorough, boroughs } =
      this.state;
    const { selectRestaurant, selectBorough, addRestaurant, deleteRestaurant } =
      this;
    return (
      <div>
        <h1 id="header">NYC Restaurants</h1>
        <nav>
          <BoroughList
            boroughs={boroughs}
            selectBorough={selectBorough}
            selectedBorough={selectedBorough}
          />
        </nav>
        <Input boroughs={boroughs} addRestaurant={addRestaurant} />
        <RestaurantList
          restaurants={restaurants}
          selectedRestaurant={selectedRestaurant}
          selectRestaurant={selectRestaurant}
          deleteRestaurant={deleteRestaurant}
        />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("app"));
