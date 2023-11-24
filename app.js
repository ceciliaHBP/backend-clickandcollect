const express = require("express");
const routes = require("./routes/routes");
const db = require("./db/db");
var cors = require("cors");
const path = require("path");
const auth = require("./middleware/auth");
const NODEJS_PORT = process.env.NODEJS_PORT;
const NODEJS_URL = process.env.NODEJS_URL;
// const WebSocket = require("ws");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// console.log(path.join(__dirname, 'public'))

// Ici j'utilise un server Static pour les images (en local)
//a voir par la suite en réel avec peut etre une dropbox ?
// je pars des Images en local /Images vers =>
app.use("/Images", express.static(path.join(__dirname, "./Images")));
// console.log('dirname', __dirname)
// const chemin = path.join(__dirname, './Images')
// console.log('test chemin',chemin )

app.get("/resetPassword/:token", (req, res) => {
  //console.log("Route resetPassword appelée avec le token:", req.params.token);
  res.sendFile(path.join(__dirname, "./fonctions/resetpassword.html"));
});

//telechargement du catalogue
app.get("/download", (req, res) => {
  const file = path.resolve(__dirname, "./public/Catalogue.pdf");
  res.download(file);
});
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.use(routes);

//create websocket server
// const server = require('http').createServer(app);

db.sync()
  .then(console.log("connexion à la base de données"))
  .catch((error) => console.log(error));

app.listen(NODEJS_PORT, () => {
  console.log(`Lancement serveur ${NODEJS_URL}:${NODEJS_PORT}`);
});

// const wss = new WebSocket.Server({ server });

// wss.on("connection", (ws) => {
//   console.log("A new client connected");
//   ws.send('Welcome new client')

//   //the server received message from any client
//   ws.on("message", (message) => {
//     console.log(`Reçu: ${message}`);
//     ws.send('Message bien recu' + message)
//   });
// });
