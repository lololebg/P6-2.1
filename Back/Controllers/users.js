const {User} = require("../Models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//Fonction qui traite les requete d'enregistrement
 async function Userc(req, res){  
     const {email, password} = req.body
     const hash = await hashed(password)
     const user = new User({ email, password: hash})
 
   user
     .save()
     .then(() => res.send({message:"lolo enregistré!"}))
     .catch(err => console.log("lolo pas enregistre", err))
 }
 
// Function pour crypter le mdp en entrée
function hashed(password){
const salt = 10;
return bcrypt.hash(password, salt,)
}

// Fonction pour crée le token
function createToken(userId, hashedPassword){
  const pass = process.env.JWT_PASSWORD
  const token =  jwt.sign({userId: userId, hashedPassword: hashedPassword }, pass, {expiresIn: "24h"})
  console.log('token:', token)
  return token
}
// Fonction est utilisée pour gérer le processus de connexion d'un utilisateur
async function logUser(req, res){
  const email = req.body.email
  const password = req.body.password
  const user = await User.findOne({email: email})
  if (!user) {
    return res.status(401).send({message: "Email ou mot de passe incorrect"})
  }
  const isOK = await bcrypt.compare(password, user.password)
  if (!isOK) {
    return res.status(401).send({message: "Email ou mot de passe incorrect"})
  }
  const token = createToken(user._id, user.password)
  res.status(200).send({userId: user._id, token: token})
}

module.exports = {Userc, logUser}
