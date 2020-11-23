const express = require("express");
const bodyParser = require("body-parser");
const headers = require("./middleware/headers"); //middleware headers

//import routes
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");

// import DB
const db = require("./models");

//la creation des tableaux en utilisant les models
db.sequelize.sync();

//utilisation express
const app = express();
app.use(express.json());

// middleware
app.use(headers); //ajoutons des en-têtes à l'objet de réponse, afin que les origines (frontend et backend) puissent communiquer entre elles
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);

const PORT = 8081;
app.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
