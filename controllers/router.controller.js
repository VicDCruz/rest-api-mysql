const Router = require("../models/router.model.js");

// Create and Save a new Router
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Router
  const router = new Router({
    noeco: req.body.noeco,
    mac: req.body.mac,
    email: req.body.email,
    edad: req.body.edad,
    cp: req.body.cp,
    genero: req.body.genero,
  });

  // Save Router in the database
  Router.create(router, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Router."
      });
    else res.send(data);
  });
};

// Retrieve all Routers from the database.
exports.findAll = (req, res) => {
  Router.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving routers."
      });
    else res.send(data);
  });
};

// Find a single Router with a routerId
exports.findOne = (req, res) => {
  Router.findById(req.params.routerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Router with id ${req.params.routerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Router with id " + req.params.routerId
        });
      }
    } else res.send(data);
  });
};

// Update a Router identified by the routerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Router.updateById(
    req.params.routerId,
    new Router(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Router with id ${req.params.routerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Router with id " + req.params.routerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Router with the specified routerId in the request
exports.delete = (req, res) => {
  Router.remove(req.params.routerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Router with id ${req.params.routerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Router with id " + req.params.routerId
        });
      }
    } else res.send({ message: `Router was deleted successfully!` });
  });
};

// Delete all Routers from the database.
exports.deleteAll = (req, res) => {
  Router.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all routers."
      });
    else res.send({ message: `All Routers were deleted successfully!` });
  });
};