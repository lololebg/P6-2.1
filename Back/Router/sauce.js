const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const multer = require("../Middleware/multer");
const Sauces = require("../Controllers/sauce");

// Routes des sauces
router.get("/", auth, Sauces.AllSauces);
router.post("/", auth, multer, Sauces.creasauces);
router.get("/:id", auth, Sauces.getsauce);
router.put("/:id", auth, multer, Sauces.modifierSauce);
router.delete("/:id", auth, Sauces.deleteSauce);
router.post("/:id/like", auth, Sauces.like);

module.exports = router;