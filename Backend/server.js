const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectdb = require("./Config/db");
const userRoutes = require("./routes/userRoutes");
const chatsRoutes =  require("./routes/chatsRoutes")
const messageRoutes =  require("./routes/messageRoutes")
const path = require("path")

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectdb();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  consolo.log("hello");
});

app.use("/app/user", userRoutes);
app.use("/app/chat",chatsRoutes);
app.use("/app/message",messageRoutes);



const __dirname1=path.resolve();
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}



app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT;

app.listen(5000, () => console.log(`Example app listening on port ${port}!`));
