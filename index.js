const express = require('express');
const path = require('path');
const port = 8500;


const app = express();

// setting up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Controller
app.get('/', (req, res) => {
    // res.send("<h1><center>To Do List App</center></h1>");
    return res.render('home', {
        title: "To Do List App"
    })
})

// Server
app.listen(port, (err) => {
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: http://localhost:${port}`);
})