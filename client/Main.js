import React from "react";
import axios from "axios";

const RestaurantList = ({ restaurants }) => {
  return (
    <div id="restaurants">
      {restaurants.map((restaurant) => {
        return (
          <div key={restaurant.id} className="restaurant">
            {restaurant.name}
          </div>
        );
      })}
    </div>
  );
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      selectedRestaurant: {},
    };
  }
  async componentDidMount() {
    const response = await axios.get("/api/restaurants");
    const restaurants = response.data;
    this.setState({ restaurants });
  }
  render() {
    const { restaurants } = this.state;
    return (
      <div>
        <RestaurantList restaurants={restaurants} />
      </div>
    );
  }
}

export default Main;
