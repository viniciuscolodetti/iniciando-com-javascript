const express = require('express');
const uuidv4 = require('uuidv4');
const app = express();

const books = [];

app.use(express.json());

app.get('/', (request, response) => {
  return response.send('Hello World');
});

app.get('/books', (request, response) => {
  return response.json(books);
});

app.post('/books', (request, response) => {

  const { title, author } = request.body;

  const book = {
    id: uuidv4.uuid(),
    title,
    author,
    likes: 0
  }

  books.push(book);

  return response.json(book);
});

app.get('/books/:id', (request, response) => {
  const { id } = request.params;

  const bookFiltered = books.filter(book => book.id === id);

  if (!bookFiltered[0]) {
    return response.status(404).json({ error: 'Book not found.' });
  }

  return response.json(bookFiltered);
});

app.put('/books/:id', (request, response) => {
  const { id } = request.params;
  const { title, author } = request.body;

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex < 0) {
    return response.status(404).json({ error: 'Book not found.' });
  }

  const likes = books[bookIndex].likes;

  const book = {
    id,
    title,
    author,
    likes
  }

  books[bookIndex] = book;

  return response.json(book);
});

app.delete('/books/:id', (request, response) => {
  const { id } = request.params;

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex < 0) {
    return response.status(404).json({ error: 'Book not found.' });
  }

  books.splice(bookIndex, 1);

  return response.status(204).send();
});

app.post('/books/:id/like', (request, response) => {
  const { id } = request.params;

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex < 0) {
    return response.status(404).json({ error: 'Book not found.' });
  }

  books[bookIndex].likes += 1;

  return response.json(books[bookIndex]);
});

app.listen(3333, () => {
  console.log('Servidor Iniciado!');
});
