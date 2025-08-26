import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from '../models/exercises_model.mjs';
import { isValid } from '../controllers/exercisesController.js';

const router = express.Router();

const ERROR_NOT_FOUND = { Error: "Not found" };
const ERROR_INVALID_REQ = { Error: "Invalid Request" };

// Create exercise
router.post('/', asyncHandler(async (req, res) => {
  if (!isValid(req)) return res.status(400).json(ERROR_INVALID_REQ);

  const exercise = await exercises.createDocu(
    req.body.name,
    req.body.reps,
    req.body.weight,
    req.body.unit,
    req.body.date
  );

  res.status(201).json(exercise);
}));

// Get all exercises
router.get('/', asyncHandler(async (req, res) => {
  const all = await exercises.findDocu();
  res.status(200).json(all);
}));

// Get exercise by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const doc = await exercises.findDocId(req.params.id);
  if (!doc) return res.status(404).json(ERROR_NOT_FOUND);
  res.status(200).json(doc);
}));

// Update exercise
router.put('/:id', asyncHandler(async (req, res) => {
  if (!isValid(req)) return res.status(400).json(ERROR_INVALID_REQ);
  const updated = await exercises.updateDoc(req.params.id, req.body);
  if (!updated) return res.status(404).json(ERROR_NOT_FOUND);
  res.status(200).json(updated);
}));

// Delete exercise
router.delete('/:id', asyncHandler(async (req, res) => {
  const deleted = await exercises.delDocId(req.params.id);
  if (!deleted) return res.status(404).json(ERROR_NOT_FOUND);
  res.status(204).json(deleted);
}));

export default router;
