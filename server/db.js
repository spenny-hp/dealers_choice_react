const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize.DataTypes;

const data = require("../nyc_restaurants.json");

const tempBoroughs = data.reduce((acc, val) => {
  acc[val.borough] = acc[val.borough] || 0;
  acc[val.borough]++;
  return acc;
}, {});

let i = 1;

for (let borough in tempBoroughs) {
  tempBoroughs[borough] = i;
  i++;
}

function invert(obj) {
  const new_obj = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      new_obj[obj[prop]] = prop;
    }
  }
  return new_obj;
}

const boroughs = invert(tempBoroughs);

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/restaurants"
);

const Borough = conn.define(
  "borough",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { underscored: true }
);

const Restaurant = conn.define(
  "restaurant",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    borough_id: {
      type: INTEGER,
    },
    sidewalk_seating: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    roadway_seating: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    liquor_license: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { underscored: true }
);

async function syncAndSeed() {
  await conn.sync({
    force: true,
  });
  await Promise.all(
    Object.keys(boroughs).map((id) => {
      Borough.create({
        id: id,
        name: boroughs[id],
      });
    })
  );
  await Promise.all(
    data.map((restaurant) => {
      let address = "";
      if (restaurant.bulding_number !== "undefined") {
        address =
          restaurant.bulding_number +
          " " +
          restaurant.street
            .split(" ")
            .filter((w) => w !== "")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");
      } else {
        adddress = restaurant.street
          .split(" ")
          .filter((w) => w !== "")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ");
      }
      Restaurant.create({
        name: restaurant.restaurant_name
          .split(" ")
          .filter((w) => w !== "")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" "),
        address: address,
        borough_id: Object.keys(boroughs).find(
          (key) => boroughs[key] === restaurant.borough
        ),
        sidewalk_seating: restaurant.approved_for_sidewalk_seating,
        roadway_seating: restaurant.approved_for_roadway_seating,
        liquor_license: restaurant.qualify_alcohol,
      });
    })
  );
  console.log("Successful seed!");
}

Restaurant.belongsTo(Borough, { foreignKey: "borough_id" });
Borough.hasMany(Restaurant, { foreignKey: "borough_id" });

module.exports = {
  syncAndSeed,
  conn,
  models: {
    Restaurant,
    Borough,
  },
};
