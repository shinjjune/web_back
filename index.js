const express = require("express");
const mongoose = require("mongoose");
const Helmet = require("helmet");
const app = express();
const user = require("./routers/user");
const advertise = require("./routers/advertise");
const config = require("./common/jwt_config");
const auth = require("./common/auth")();
const cors = require("cors");

const dbURI = process.env.MONGODB_URI || "mongodb://localhost/stamp-test";
app.use(Helmet());
app.use(cors());
app.use((req, res, next) => {
  mongoose
    .connect(dbURI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(() => next())
    .catch(e => next(e));
});
app.use(auth.initialize());
app.use(express.json());
// app.use("/auth", user);
app.use("/stamp", user);
app.use("/advertise", advertise);
app.use(() => mongoose.disconnect());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
