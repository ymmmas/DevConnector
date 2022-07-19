// npm run server
// express server
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// connect database
connectDB();

// init middleware
// allows us to get the data in request body
app.use(express.json({ extended: false }));

// app.get('/', (req,res)=> res.send('API Running'));

// define routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// it will look for an env var called "port"
// default, locally 5100, if no env var setted
const PORT = process.env.PORT || 5100;

// lsiten on this port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
