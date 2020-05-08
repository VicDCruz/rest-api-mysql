const sql = require("./db.js");

// 1 - Colección no pudo ser obtenida
// 2 - Error para encontrar un ID
// 3 - Error al guardar con un registro
// 4 - Error al guardar con varios registros
// 5 - Género no es correcto
// 6 - Llaves no corresponden
// 7 - Error al actualizar
// 8 - Error al eliminar

// constructor
const Router = function (router) {
  this.noeco = router.noeco;
  this.mac = router.mac;
  this.email = router.email;
  this.edad = router.edad;
  this.cp = router.cp;
  this.genero = router.genero;
};

Router.create = (newRouter, result) => {
  sql.query("INSERT INTO routers SET ?", newRouter, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("created router: ", { id: res.insertId, ...newRouter });
    result(null, { id: res.insertId, ...newRouter });
  });
};

Router.findById = (routerId, result) => {
  sql.query(`SELECT * FROM routers WHERE id = ${routerId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found router: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Router with the id
    result({ kind: "not_found" }, null);
  });
};

Router.getAll = result => {
  sql.query("SELECT * FROM routers", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("routers: ", res);
    result(null, res);
  });
};

Router.updateById = (id, router, result) => {
  sql.query(
    "UPDATE routers SET email = ?, name = ?, active = ? WHERE id = ?",
    [router.email, router.name, router.active, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Router with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated router: ", { id: id, ...router });
      result(null, { id: id, ...router });
    }
  );
};

Router.remove = (id, result) => {
  sql.query("DELETE FROM routers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Router with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted router with id: ", id);
    result(null, res);
  });
};

Router.removeAll = result => {
  sql.query("DELETE FROM routers", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} routers`);
    result(null, res);
  });
};

module.exports = Router;