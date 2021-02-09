/// oumaima hedhli
const express = require('express')
const router = express.Router()
const ancien_articleController = require('../controllers/ancien_article.controller');

// Retrieve all ancien_articles

// Create a new ancien_article

// Retrieve a single ancien_article with id
router.get('/:id', ancien_articleController.findById);
router.get('/', ancien_articleController.findAll);
router.delete('/:id', ancien_articleController.delete);


router.post('/', ancien_articleController.create);




module.exports = router