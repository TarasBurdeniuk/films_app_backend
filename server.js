const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(cors());

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

app.listen(PORT, () => console.warn(`Server started on port ${PORT}`));
