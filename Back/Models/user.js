const mongoose = require("mongoose");

// Permet de ne pas mettre 2 fois meme email
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// création d'un modèle de données "product" basé sur le schéma définit
const User = mongoose.model("User", userSchema)


module.exports = {User}