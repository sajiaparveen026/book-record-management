const express = require("express");
const app = express();

//import routes
const userRouter = require(`./routes/users.js`);
const bookRouter = require("./routes/books");


const PORT = 8081;

app.use(express.json());

//Home
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :)",
    data: "hey",
  });
});

app.use("/users", userRouter);
app.use("/books", bookRouter);


//Other Roots
app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
