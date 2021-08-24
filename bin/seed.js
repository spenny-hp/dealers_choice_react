const { syncAndSeed } = require("../db");

const seed = async () => {
  await syncAndSeed();
};

seed();
