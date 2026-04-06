const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API route
app.get('/api/products', (req, res) => {
    res.json([
        { name: "Mouse", price: 500 },
        { name: "RAM", price: 2000 },
        { name: "SSD", price: 3500 }
    ]);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
