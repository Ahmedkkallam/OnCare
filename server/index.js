const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/users", require("./routes/users"));

app.listen(PORT, console.log(`OnCare app listening on port ${PORT}`));
