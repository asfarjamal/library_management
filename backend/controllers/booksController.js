const Book = require('../models/book');
const { MinHeap } = require('heap-js'); 

// Add a book
exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, publication_date } = req.body;
    const newBook = await Book.create({ title, author, isbn, publication_date });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getBooks = async (req, res) => {
  const { search, sort, year } = req.query;

  let whereClause = {};
  if (search) whereClause = { ...whereClause, title: { $like: `%${search}%` } };
  if (year) whereClause = { ...whereClause, publication_date: { $gte: `${year}-01-01` } };

  try {
    const books = await Book.findAll({
      where: whereClause,
      order: [[sort || 'title', 'ASC']],
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTopKBooks = async (req, res) => {
  try {
    const { k } = req.query;
    const K = parseInt(k, 10);

    if (!K || K <= 0) {
      return res.status(400).json({ error: 'K must be a positive integer' });
    }


    const books = await Book.findAll({
      attributes: ['title', 'author', 'isbn', 'publication_date'],
    });

   
    const minHeap = new MinHeap((a, b) => a.title.length - b.title.length);

    books.forEach((book) => {
      minHeap.push(book); 
      if (minHeap.size() > K) {
        minHeap.pop(); 
      }
    });

   
    const topKBooks = minHeap.toArray().sort((a, b) => b.title.length - a.title.length);

    res.status(200).json({ topKBooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
