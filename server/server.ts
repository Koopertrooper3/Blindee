// Run this script to launch the server.
// The server should run on localhost port 8000.


// import express from "express"
// import mongoose from "mongoose"
// import cors from "cors"

import express, {Express, request,response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import hash from "object-hash";
import stdio from 'stdio';
import fs from 'fs'

//Importing schema
import {recipe} from "./models/recipe"

//Improting types
import { Irecipe, mealType } from "./shared_types/typedefinitions"
import { debug } from "console";

//Flags

let DEBUG_FLAG = 0 //Flag for debugging, if 1 then debug features are used

//CLI parser
const options = stdio.getopt({
  debug : {args: 1, description : "Enables debug mode, activating debug special features"}
})

if(options?.["debug"] == "1"){
  DEBUG_FLAG = 1
  console.log("debug activated")
}
const app: Express = express();
const port = 8000;

//Cross Origin Resource Sharing
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

//Multiparty body reader and image uploading
let IMAGE_FILEPATH = './images'
const storage = multer.diskStorage({destination: function (req, file, cb) {
    cb(null, IMAGE_FILEPATH)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, hash.sha1(req.body) + uniqueSuffix + ".jpg")
  }})

const upload = multer({dest: "./images", storage: storage})

//Debug setup, if debug mode is activated set up data structures necessary for debug
let mongoDB : string
let debugImages : string[]

if(DEBUG_FLAG == 1){
  mongoDB = 'mongodb://127.0.0.1:27017/recipe_manager_debug';
  mongoose.connect(mongoDB)
}else{
  mongoDB = 'mongodb://127.0.0.1:27017/recipe_manager';
  mongoose.connect(mongoDB)
}
const db = mongoose.connection


app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`);
});

app.post('/submit/newrecipe', upload.single('recipeImage') ,async (req :express.Request, res:express.Response) =>{
  if(DEBUG_FLAG == 1) {
    console.log("Submitting new Recipe")
    console.log(req.body)
    console.log(req.file)
  }  


    let newRecipe : Irecipe = {
      image: {
        realName : "",
        pathName : ""
      },
      title: req.body.recipeName,
      mealType : req.body.recipeMealType as mealType[],
      difficulty: req.body.recipeDifficulty,
      utensils : req.body.recipeUtensils.map( (input : {utensil: string}) => {return input.utensil}),
      recipeSteps: req.body.recipeSteps.map( (input : {step: string}) => {return input.step}),
      ingredients: req.body.recipeIngredients,
    }

  
    newRecipe.image.realName = req.file?.originalname
    newRecipe.image.pathName = req.file?.path
    const savedRecipe : any = await new recipe(newRecipe).save()

    if(DEBUG_FLAG == 1){
      debugImages.push(newRecipe.image.pathName!)
    }
    
    res.status(200).send()
} );

app.get('/recipe/:recipeid', (req:any  ,res:any ) =>{
  console.log('Retrieving new recipe')
});

//Signal handler on exit

async function onexit(){
  if(DEBUG_FLAG == 1){
    if(mongoDB != 'mongodb://127.0.0.1:27017/recipe_manager_debug'){
      process.exit()
    }else{
      await mongoose.connection.db.dropDatabase()
      console.log("Debug Database Dropped")
    }

    for (const img of debugImages){
      try{
        fs.unlinkSync(img)
      }catch(err){
        console.log("failed to delete" + img)
      }
    }
  }
  process.exit()
}

process.on('SIGINT',onexit)
process.on('SIGTERM',onexit)
process.on('SIGTERM',onexit)