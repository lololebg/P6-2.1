const multer = require("multer")

// Storage sert à définir le mode de stockage des fichiers téléchargés via Multer.
// On utilise multer.diskStorage() pour créer un objet de stockage Multer, qui est utilisé pour gérer le téléchargement de fichiers.
const storage = multer.diskStorage({destination: "images/", filename: function(req, file, cb){
    cb(null, LofileName(req, file))
    }
})

/*Fonction qui permet de génere un nom de fichier unique pour chaque image télelchargée*/
function LofileName(req, file, cb){
    const filename = `${Date.now()}-${file.originalname}`.replace(/\s/g,"-")
    file.filename = filename
    return filename
}

// On exporte le middleware pour gérer les fichier
module.exports = multer({ storage: storage }).single("image");