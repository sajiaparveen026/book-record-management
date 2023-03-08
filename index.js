const express = require("express");
const { users } = require("./data/users.json");
const { books } = require("./data/books.json");
const app = express();
const PORT = 8081;

app.use(express.json());

/*
     Route : /users
     Method : GET
     Description : get all users
     Access : public
     Parameters : none
*/

app.get("/users", (req, res) => {
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
app.get("/users/:id", (req, res) => {
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
app.post("/users", (req, res) => {
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

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User exixts",
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
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Does not exists",
    });
  }
});

//Home
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :)",
    data: "hey",
  });
});

//Other Roots
app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
