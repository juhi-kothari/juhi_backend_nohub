const express = require('express')
const multer = require('multer')

const app = express();
const port = 8000;

//const upload = multer({dest: 'uploaded/'});

app.use('/static', express.static('public'));
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
  
const upload = multer({ storage: storage })

app.get('index.html',(req,res)=>{
    res.sendFile(__dirname + '/public/html/index.htm');
})

app.get('/',(req,res)=>{
    res.send('Hello world get');
})

/*app.post('/register', (req,res)=>{
    console.log(req.body);
    res.send('hello world post');
}) used for registration*/

app.post('/upload', (req,res)=>{
    console.log(req.body,req.file);
    res.send('hello world post');
})


app.put('/',(req,res)=>{
    res.send('create put');
})

app.delete('/',(req,res)=>{
    res.send('hello delete');
})

app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})