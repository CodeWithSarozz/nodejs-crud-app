var UserDB = require("../model/model");

// * create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // new user
  const user = new UserDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data);

      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

// * retrieve and return all user / retrieve and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    UserDB.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: "User not found",
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving data",
        });
      });
  } else {
    UserDB.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retrieving user information",
        });
      });
  }
};

// * Update a new identified user by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;

  UserDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Updating User" });
    });
};

// * Delete user by id
exports.delete = (req, res) => {
  const id = req.params.id;

  UserDB.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete User With id ${id}`,
        });
      } else {
        res.send({
          message: "User Deleted",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Delete Fail for User id " + id,
      });
    });
};
