// express server
const express = require('express');

const app = express();

app.get('/', (req,res)=> res.send('API Running'));

// it will look for an env var called "port"
// default, locally 5000, if no env var setted 
const PORT = process.env.PORT || 5100;

// lsiten on this port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
