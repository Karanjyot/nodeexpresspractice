var express = require("express");
var path = require("path");
var app = express();
const mongoose = require("mongoose");
const cors = require("cors");

var PORT = 5000 || process.env.PORT;

app.use(cors());

//middleware to handle JSON/URLencoded data. Parse JSON (turn json into js object)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import routes
app.use("/", require("./routes/apiroutes"));
app.use("/", require("./routes/auth"));

// set a static folder
// app.use(express.static(path.join(__dirname, 'public')))

//connect to DB

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/newdb",
  { useNewUrlParser: true },
  () => {
    console.log("connected to DB");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
