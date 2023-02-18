const fs = require("fs");
const {product} = require("../Models/sauce")

// fonction pour récupérer les informations d'une sauce en particulier
    function getsauce(req, res) {
        const {id} = req.params
        product.findById(id)
        .then(products => {
            console.log("le produit:", products)
            res.send(products)
        })
        .catch(console.error)
    }
    
    function deleteSauce(req, res){
      const {id} = req.params
      product.findByIdAndDelete(id)
        .then(deleteImage)
        .then(products => res.send({message: products}))
        .catch(console.error)
    }
    
    function deleteImage(products){
      const imageUrl = products.imageUrl
      const fileDelet = imageUrl.split("/").at(-1)
      unlink(`images/${fileDelet}`, (err) => {
        console.error("Probleme")
    }) 
    console.log("On va suprrimer lezs fichier suivant:", imageUrl)
    return products
    }

    function AllSauces  (req, res, next) {
        product.find()
          .then((products) => {
            res.status(200).json(products);
          })
          .catch((error) => {
            res.status(400).json({
              error: error,
            });
          });
        };
    
    // fonction pour modifier les information d'une sauce de la base de données
    function modifierSauce(req, res){
    const {
        params: {id}
    } = req
    const Image = req.file != null
    const payload = Imagefil(Image, req)
    product.findByIdAndUpdate(id, payload)
        .then((Response) => Update (Response, res))
        .catch((err) => console.log("Probleme", err))
    }
    
    
    function Imagefil(Image, req){
        if (!Image) return req.body
        const payload = JSON.parse(req.body.sauce)
        payload.imageUrl = ImageUrl(req, req.file.filename)
        return payload
    }
    
    // fonction Update est utilisée pour renvoyer une réponse à une requête de mise à jour en fonction du résultat
    function Update(Response, res){
        if (Response === null){
           return res.status(404).send({message: "Not found Database"})
        }
        res.status(200).send({message:"Successfully"})
    }
    
    // Function Image fichier
    
    function ImageUrl(req, filename){
        return req.protocol + "://" + req.get("host") + "/images/" + filename
    }
    
     // Fonction pour enregistre les infos dans la dataBase
    function creasauces(req,res){
    const {body, file} = req
    const sauce = JSON.parse(body.sauce)
    const {name, manufacturer, description, mainPepper, heat, userId} = sauce
    const {filename} = file
    function LofileName(req, filename){
        return req.protocol + "://" + req.get("host") + "/images/" + filename
    }
    
    const products = new product({ 
        userId: userId,
        name: name,
        manufacturer : manufacturer,
        description : description,
        mainPepper : mainPepper,
        imageUrl : LofileName(req, filename),
        heat : heat, 
        likes : "",
        dislikes : "", 
        usersLiked : [""], 
        usersDisliked : [""],})
        products
            .save()
            
            .then((products) => res.status(201).send({products}))
          
            .catch((err) => res.status(500).send(err))
    }
    
    
    function like(req, res, next) {
        const userId = req.body.userId;
        const liked = req.body.like;
        const { id } = req.params;
      
        product.findById(id)
          .then(product => {
            if (!product) return res.status(404).send({ message: "Product not found" });
    
            if (liked === 1) {
              product.usersLiked.push(userId);
              product.likes++;
            } else if (liked === 0) {
              product.usersLiked.splice(product.usersLiked.indexOf(userId), 1);
              if (product.likes > 0) {
                product.likes--;
              }
            } else if (liked === -1) {
              product.usersDisliked.push(userId);
              product.dislikes++;
            }
      
            if (liked === 0 && product.usersDisliked.includes(userId)) {
              product.usersDisliked.splice(product.usersDisliked.indexOf(userId), 1);
              if (product.dislikes > 0) {
                product.dislikes--;
              }
            }
            return product.save();
          })
          .then(product => res.status(200).send(product))
         }  
         module.exports = { creasauces, getsauce, AllSauces,  deleteSauce, modifierSauce, like}    