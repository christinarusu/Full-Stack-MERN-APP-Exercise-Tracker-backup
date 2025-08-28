/**
Christina Rusu
 */

import express from "express";
import cors from "cors";
import asyncHandler from "express-async-handler";
import * as exercises from "./exercises_model.mjs";
import "dotenv/config";

const app = express();

// enable CORS for all origins (dev + prod)
app.use(cors());

// parse JSON
app.use(express.json());

// connect to Mongo
exercises.connect()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(console.error);


/**
 * 
 * @param {object} req 
 * @returns true if the exercise contains valid properties
 */

function isValid(req){
    const format = /^\d\d-\d\d-\d\d$/;
    if(format.test(req.body.date) === false){
        return false;
    }
    else if(!req.body.name || !req.body.reps || !req.body.weight || !req.body.unit || !req.body.date){
        return false;
    }
    else if(req.body.name.length === 0){
        return false;
    }
    else if(req.body.reps <= 0){
        return false;
    }
    else if(req.body.weight <= 0){
        return false;
    }
    else if(req.body.unit !== "lbs" && req.body.unit !== "kgs"){
        return false;
    }
    else if(typeof req.body.name !== 'string' || typeof req.body.reps !== 'number' ||
        typeof req.body.weight !== 'number' || typeof req.body.unit !== 'string' ||
        typeof req.body.date !== 'string'){
        return false;
    }
    else if(req.body.date[2] === '-' && req.body.date[5] === '-'){
        const datesplit = req.body.date.split("-")
        const month = parseInt(datesplit[0], 10)
        const day = parseInt(datesplit[1], 10)
        const year = parseInt(datesplit[2], 10)
        if(month < 1 || month > 12){
            return false;
        }
        else if((month === 1 || month === 3 || month === 5 || month === 7 || month ===8 || 
        month === 10 || month === 12) && (day < 1 || day > 31)){
            return false;
        }
        else if((month === 4 || month === 6 || month === 9 || month === 11)
            && (day < 1 || day > 30)){
            return false;
        }
        else if((month === 2)){
            const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
            if (isLeapYear && (day < 1 || day > 29)) {
                return false;
            } 
            else if (!isLeapYear && (day < 1 || day > 28)) {
                return false;
            }
        }
    }
    return true;
}


/**
 * Creates a new exercise with the query parameters provided in the body
 */

app.post('/exercises', asyncHandler(async (req, res) => {
    if(!isValid(req)){
        res.status(400).json(ERROR_INVALID_REQ);
    }
    else{
        const exercise = await exercises.createDocu(req.body.name, 
                            req.body.reps, 
                            req.body.weight,
                            req.body.unit,
                            req.body.date);
       return res.status(201).json(exercise);
    }
}
));

/**
 * Retrieves an array of all the exercises in the collection
 */

app.get('/exercises', asyncHandler(async (req, res) => {
    const getexec = await exercises.findDocu();
    return res.status(200).json(getexec);
}))

/**
 * Retrieve a exercise based on ID
 */

app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const ex_id = await exercises.findDocId(req.params.id);
    if(ex_id === null){
       return res.status(404).json(ERROR_NOT_FOUND);
    }
    return res.status(200).json(ex_id);
}))

/**
 * Update the exercise by looking it up by ID and modifying the its body
 */

app.put('/exercises/:id', asyncHandler(async (req, res) => {
    const ex_id = req.params.id
    const ex_body = req.body
    if(!isValid(req)){
        return res.status(400).json(ERROR_INVALID_REQ);
    }
    const mod_doc = await exercises.updateDoc(ex_id, ex_body);
    if(mod_doc === null){
        return res.status(404).json(ERROR_NOT_FOUND);
    }
    else{
        return res.status(200).json(mod_doc);
    }
}))

/**
 * Delete the exercise matching the specified ID
 */

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const ex_id = await exercises.delDocId(req.params.id);
    if(ex_id === null){
       return res.status(404).json(ERROR_NOT_FOUND);
    }
    return res.status(204).json(ex_id);
}))

export default app






















