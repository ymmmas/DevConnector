// npm run server
// express server
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// init middleware
// allows us to get the data in request body 
app.use(express.json({extended:false}));

app.get('/', (req,res)=> res.send('API Running'));

// define routes

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

// it will look for an env var called "port"
// default, locally 5000, if no env var setted 
const PORT = process.env.PORT || 5100;

// lsiten on this port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
