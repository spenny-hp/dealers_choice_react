const router = require("express").Router();
const {
  models: { Restaurant, Borough },
} = require("./db");

router.get("/restaurants", async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();
    console.log(JSON.stringify(restaurants, null, 2));
    res.send(`
      ${JSON.stringify(restaurants, null, 2)}
    `);
  } catch (err) {
    next(err);
  }
});

router.get("/boroughs", async (req, res, next) => {
  try {
    const boroughs = await Borough.findAll({
      attributes: ["id", "name"],
    });
    console.log(JSON.stringify(boroughs, null, 2));
    res.send(`
      ${JSON.stringify(boroughs, null, 2)}
    `);
  } catch (err) {
    next(err);
  }
});

router.get("/restaurants/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [Borough],
    });
    console.log(JSON.stringify(restaurant, null, 2));
    res.send(`
      <h1>${restaurant.name}</h1>
      <pre>${JSON.stringify(restaurant, null, 2)}</pre>
    `);
  } catch (err) {
    next(err);
  }
});

router.post("/restaurants", async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();
    const names = restaurants.map((restaurant) => restaurant.name);
    if (names.includes(req.body.name)) {
      return res.sendStatus(409);
    }
    await Restaurant.create(req.body);
    res.status(201).json(req.body);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
