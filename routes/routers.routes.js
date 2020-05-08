module.exports = app => {
  const routers = require("../controllers/router.controller.js");

  // Create a new Router
  app.post("/routers", routers.create);

  // Retrieve all Routers
  app.get("/routers", routers.findAll);

  // Retrieve a single Router with routerId
  app.get("/routers/:routerId", routers.findOne);

  // Update a Router with routerId
  app.put("/routers/:routerId", routers.update);

  // Delete a Router with routerId
  app.delete("/routers/:routerId", routers.delete);

  // Create a new Router
  app.delete("/routers", routers.deleteAll);
};