/**
 * Christina Rusu
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

import mongoose from 'mongoose';
import 'dotenv/config';

let isConnected = false; // track connection state

async function connect() {
  if (isConnected) {
    // reuse existing DB connection
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
      dbName: EXERCISE_DB_NAME,
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Mongo connection error:", err.message);
    throw err;
  }
}

/**
 * Define the schema
 */

const exSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true},
})

/**
 * Compile the model from the schema.
 */
const Document = mongoose.model(EXERCISE_DB_NAME, exSchema);

/**
 * Create an exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createDocu = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Document
    const document = Document({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // Call save to persist this object as a document in MongoDB
    return document.save();
}

/**
 * Read using GET operation
 * @returns A promise. Resolves to an array of JSON objects. If the collection is empty,
 * returns an empty array. 
 */

const findDocu = async () => {
    const doc = Document.find()
    return doc;
}

/**
 * Read using GET operation
 * @param {object} doc_id
 * @returns A promise. Resolves to the JSON object that has the id matching doc_id
 */

const findDocId = async(doc_id) => {
    const id = Document.findById(doc_id)
    return id.exec();
}

/**
 * Update using PUT operation
 * @param {object} _id
 * @param {number, string} new_info
 * @returns A promise. Resolves to the JSON object that has an updated body with the new_info
 */

const updateDoc = async(_id, new_info) => {
    const update = await Document.updateOne({_id}, new_info)
    return Document.findById(_id);
}

/**
 * Delete using DELETE operation using the exercise ID
 * @param {object} id
 * @returns A promise. Resolves to an empty body or error if the ID does not exist
 */

const delDocId = async(_id) => {
    const doc_id = await Document.findById(_id)
    if(!doc_id){
        return null;
    }
    else{
        const delDoc_id = await doc_id.deleteOne();
    }
}


export {connect, createDocu, findDocu, findDocId, updateDoc, delDocId};

