const express = require('express'); //import express
const path = require('path'); //import path
const port = 8000;

const db = require('./config/mongoose'); //import database
const Tasks = require('./models/tasks'); //import schema
const app = express();//call express via app

let taskList = [
    {
        desc: "go to gym",
        category: "personal",
        date: '2023-07-22'
    },
    {
        desc: "go to school",
        category: "school",
        date: '2023-07-22'
    },
    {
        desc: "go to market",
        category: "work",
        date: '2023-07-22'
    }
]
// setting up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(express.urlencoded());

// include static files
app.use(express.static('assets'));

// Controller
app.get('/', async(req, res) => {
    try{
        const taskList = await Tasks.find({});
        return res.render('home', {
            title: "To Do List App",
            todo_list: taskList
        })
    }
    
    catch(err){
        if(err) {console.log('Error in displaying the to_do list from database'); return;}
    }
    
});

app.post('/create-list', async(req, res) => {
    // console.log(req.body);
    try{
        const newTask = await Tasks.create({
            desc: req.body.desc,
            category: req.body.category,
            date: req.body.date
        });
        console.log('new task added', newTask);
        return res.redirect('/');
    }
    catch (err) {
        if(err){console.log('error in creating the task', err); return;}
    }
})

// deleting the tasks
app.get('/delete-task', async(req,res) => {
    try{
        let taskId = req.query.id;
        let deleteId = await Tasks.findByIdAndDelete(taskId);
        console.log('contact deleted successfully');
        return res.redirect('back');
    }
    catch(err){
        console.log('error in deleting the task from database', err);
        return;
    }
});


// Server
app.listen(port, (err) => {
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: http://localhost:${port}`);
})