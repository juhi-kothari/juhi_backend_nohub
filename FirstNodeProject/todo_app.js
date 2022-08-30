const express = require('express');
const multer = require('multer');

const app = express();
const port = 7000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const storage = multer.diskStorage({
       
    destination: (req, file, callbackFunc) => {

        callbackFunc(null,'uploaded/');
    },
   
    filename:  (req, file, callbackFunc) => {

        console.log('file');
        callbackFunc(null,'file.origionalname');
      
      
    }
})
  
const upload = multer({ storage: storage }).any();

//app.use(logger);

app.use('/static', express.static('public'));



app.post('/upload', (req,res)=>{
    console.log(req.body,req.file);
    res.send('hello world post');
})

//todo api

const todoList = [];

// API to create new task

app.post('/task', (req,res)=>{
    const { name,description } = req.body;
    const id = Math.floor(Math.random()*10000);
    const newTask = {
        name,
        description,
        id,
    };
    todoList.push(newTask);

    res.status(200).send({
        status : true,
        message : "Task created successfully",
       
    });
    
});


//API for getting all the task

app.get('/task' ,(req,res)=>{
    
    res.status(200).send({
        status : true,
        message : "Tasks fetched successfully",
        data : todoList

    });
});


//API for getting task by id

app.get('/task/:id',(req,res)=>{
    console.log(req.params);
    const { id } = req.params;
    const result = todoList.find(obj => obj.id == id);

    res.status(200).send({
        status : true,
        message : "Tasks fetched successfully",
        data : result

    });
});

//API for deleting individual task by id

app.delete('/task/:id',(req,res) =>{
    const {id} = req.params;
    const index = todoList.indexOf(obj => obj.id == id);

    todoList.splice(index-1,1);
    res.status(200).send({
        status : true,
        message : "Tasks deleted successfully",
        data : todoList

    });
    
});

app.put('/task/:id' ,(req,res)=>{

    
    res.status(200).send({
        status : true,
        message : "Tasks updated successfully",
        data : todoList

    });
});


app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})


