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
    if(todoList.length!=0){
        res.status(200).send({
            status : true,
            message : "Tasks fetched successfully",
            data : todoList
    
        });

    }
    else{
        res.status(400).send({
            status : false,
            message : "Task is not created yet",
    
        });


    }
    
});


//API for getting task by id

app.get('/task/:id',(req,res)=>{
    try{
        console.log(req.params);
        const { id } = req.params;
        var result = {};
        //const result = todoList.find(obj => obj.id == id);
        var index = -1;
        for(var i = 0 ; i<todoList.length;i++){
            if(id == todoList[i].id){
                index = i;
                result =todoList[i];
            }

        }

        if(index != -1){
            res.status(200).send({
                status : true,
                message : "Tasks fetched successfully",
                data : result
        
            });

        }
        else{
            res.status(400).send({
                status : false,
                message : "Error: Record not found",
        
            });

        }
    }

      catch(e){

        res.status(400).send({
            status : false,
            message : "Error:" + e.message,
    
        });
      }

    
   
});

//API for deleting individual task by id

app.delete('/task/:id',(req,res) =>{
    const {id} = req.params;
    const index = todoList.findIndex(obj => obj.id == id);
    const deletedtask = todoList[index];

    if(index != -1){
        todoList.splice(index,1);
     res.status(200).send({
         status : true,
         message : "Tasks deleted successfully",
         data : deletedtask

        });


    }
    else{
        res.status(400).send({
            status : false,
            message : "Error: ID is not found",
    
        });

    }
    
    
});

//API for updating individual task

app.put('/task/:id' ,(req,res)=>{
    const {id} = req.params;
    const {body} = req;
    try{
        for(var i=0 ; i<todoList.length;i++){
            if(todoList[i].id==id){
                todoList[i] = {...todoList[i],...body};
                break;
            }
        } 
        res.status(200).send({
            status : true,
            message : "Tasks updated successfully",
            data : todoList[i]
    
        });

    }
    

    catch(e){
        res.status(400).send({
            status : false,
            message : "Error: Record not found",
    
        });
    }
});


app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})


