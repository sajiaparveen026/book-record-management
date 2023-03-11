const express = require("express");
const { users } = require("../data/users.json");
const router = express.Router();

/*
     Route : /users
     Method : GET
     Description : get all users
     Access : public
     Parameters : none
*/

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});
/*
     Route : /users/:id
     Method : GET
     Description : get the users by id
     Access : public
     Parameters : Id
*/
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((elem) => elem.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exixt",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User found",
    data: user,
  });
});

/*
     Route : /users
     Method : POST
     Description : creating a new user
     Access : public
     Parameters : none
*/
router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id == id);
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User exixts",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  //201 : updation
  return res.status(201).json({
    success: true,
    message: "user added successfully",
    data: users,
  });
});

/*
     Route : /users/:id
     Method : PUT
     Description : creating a new user by id
     Access : public
     Parameters : id
*/

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exists",
    });
  }
  const updateUsersData = users.map((each) => {
    if (each.id == id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User updated!",
    data: updateUsersData,
  });
});

/*
     Route : /users/:id
     Method : DELETE
     Description : delete user by id
     Access : public
     Parameters : id
*/
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Does not exists",
    });
  }

  const index = users.indexOf(user);
  users.splice(index, 1); //1 means delete one time

  return res.status(200).json({
    success: true,
    message: "Deleted User...",
    data: users,
  });
});

/*
     Route : /users/subscriptionDetails/:id
     Method : get
     Description :Get all users subscription details
     Access : public
     Parameters : id
*/

router.get("/subscriptionDetails/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with ID does not exist",
    });

    const getDateInDays = (data = "") => {
      let date;
      if (data === "") {
        date = new Date();
      } else {
        date = new Date(data);
      }
      let days = Math.floor(data / (1000 * 60 * 60 * 24));
      return days;
    };
    const subscriptionType = (date) => {
      if (users.subscriptionType == "Basic") {
        date = date + 90;
      } else if (users.subscriptionType == "Standard") {
        date = date + 180;
      } else if (users.subscriptionType == "Premium") {
        date = date + 365;
      }
   return date;
    };
  }
});
module.exports = router;
