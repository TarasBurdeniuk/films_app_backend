const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.get('/', (req, res) => {
  res.send('Films app started').end();
});

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/films', require('./routes/api/films'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
