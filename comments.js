// Create web server with Express
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Data
const comments = [
    { id: 1, comment: 'Hello' },
    { id: 2, comment: 'World' },
    { id: 3, comment: 'Foo' },
    { id: 4, comment: 'Bar' },
    { id: 5, comment: 'Baz' },
];

// Get all comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// Get comment by ID
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

// Create new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

// Update existing comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    comment.comment = req.body.comment;
    res.send(comment);
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.send(comment);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});