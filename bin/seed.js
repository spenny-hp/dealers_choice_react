const { syncAndSeed } = require("../server/db");

const seed = async () => {
  await syncAndSeed();
};

seed();
