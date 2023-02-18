const mongoose = require("mongoose");

// définition d'un schéma pour les objets "sauce" enregistrés dans la base de données
const shema = new mongoose.Schema({
    userId: String,
     name: String,
     manufacturer : String,
     description : String,mainPepper : String,
     imageUrl : String,
     heat : Number, 
     likes : Number,
     dislikes : Number,
     usersLiked : [ String ],
     usersDisliked : [String],
})

// création d'un modèle de données "product" basé sur le schéma définit
const product = mongoose.model("product", shema)

module.exports = {product}