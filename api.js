const router = require("express").Router();
const {
  models: { Restaurant, Borough },
} = require("./db");

router.get("/restaurants", async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();
    console.log(JSON.stringify(restaurants, null, 2));
    res.send(`
      <pre>${JSON.stringify(restaurants, null, 2)}</pre>
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

module.exports = router;
