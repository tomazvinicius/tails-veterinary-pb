import express from "express";
const router = express.Router();

import TutorController from "../controllers/TutorController";
const tutorController = new TutorController();
import { authenticateTutor } from "../middleware/authentication";

router.get("/tutors", authenticateTutor, tutorController.getAllTutors);
router.post("/tutor", tutorController.createTutor);
router
  .route("/tutor/:id")
  .put(authenticateTutor, tutorController.updateTutor)
  .delete(authenticateTutor, tutorController.deleteTutor);

export default router;
