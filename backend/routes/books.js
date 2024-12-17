const express = require('express');
const router = express.Router();
const { addBook, getBooks, getTopKBooks } = require('../controllers/booksController');


router.post('/', addBook);
router.get('/', getBooks);

// route for top K books
router.get('/top-k-titles', getTopKBooks);

module.exports = router;
