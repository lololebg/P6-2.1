
const express = require("express");
const app = express();
const  sauces  = require('./Router/sauce');
const userRoutes = require("./Router/users");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

app.use(express.json());

const mongoose = require('mongoose');

mongoose
  
  .connect(
    `mongodb+srv://${process.env.NOM_MONGO}:${process.env.MDP_MONGO}@cluster0.w2shknd.mongodb.net/?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/sauces",sauces);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
