const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");

const { sequelize } = require("./database/database");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const mahadbtRoutes = require("./routes/mahadbtRoutes");
const uploadRoute = require("./routes/uploadRoute");
const courseRoutes = require("./routes/courseRoutes");
const dropdownRoutes = require("./routes/dropDownRoutes");
const jarRoutes = require("./routes/jarRoutes");

dotenv.config();
// comment
const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connection Estabalished.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.use(cors());
app.use(morgan("tiny"));
app.use(fileupload());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/html" }));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", collegeRoutes);
app.use("/api", mahadbtRoutes);
app.use("/api", uploadRoute);
app.use("/api", courseRoutes);
app.use("/api", dropdownRoutes);
app.use("/api", jarRoutes);

// app.js or index.js

// Call the function to execute the stored procedure
// executeStoredProcedure();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server in Running 🏃🏻 on port ${PORT}!`));
