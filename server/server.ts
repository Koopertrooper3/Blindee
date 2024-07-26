// Run this script to launch the server.
// The server should run on localhost port 8000.


// import express from "express"
// import mongoose from "mongoose"
// import cors from "cors"

import express, {Express, request,response} from "express"
import mongoose from "mongoose"
import cors from "cors"
import multer from "multer"

//Importing schema
import {recipe} from "./models/recipe"

//Improting types
import { Irecipe } from "./shared_types/typedefinitions"

const app: Express = express();
const port = 8000;

//Cross Origin Resource Sharing
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

//Multiparty body reader
const upload = multer({dest: "images/"})

//let mongoDB = 'mongodb://127.0.0.1:27017/fake_so';
//mongoose.connect(mongoDB)
//const db = mongoose.connection

app.use(express.json())

//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.once('open', () => {
  //console.log('Connected to MongoDB');
//});

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`);
});

app.post('/submit/newrecipe', upload.single('recipeImage') ,async (req :express.Request, res:express.Response) =>{
    console.log("Submitting new Recipe")
    console.log(req.body)
    console.log(req.file)


    let newRecipe : Irecipe = req.body
    multer.diskStorage({destination: function (req, file, cb) {
      cb(null, '/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, req.body.recipe + '-' + uniqueSuffix)
    }})
    
    //const savedRecipe : any = await new recipe(req.body)

    res.status(200).send()
} );

app.get('/recipe/:recipeid', (req:any  ,res:any ) =>{
  console.log('Retrieving new recipe')
});