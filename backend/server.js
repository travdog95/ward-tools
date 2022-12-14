const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));
app.use("/api/fileinfo", require("./routes/fileInfoRoutes"));
app.use("/api/talks", require("./routes/talkRoutes"));
app.use("/api/prayers", require("./routes/prayerRoutes"));
app.use("/api/sacramentmeetings", require("./routes/sacramentMeetingRoutes"));
app.use("/api/importData", require("./routes/importDataRoutes"));
app.use("/api/fix", require("./routes/fixRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
