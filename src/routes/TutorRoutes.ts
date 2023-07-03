import express from "express";
const router = express.Router();

import TutorController from "../controllers/TutorController";
const tutorController = new TutorController();


router.route("/tutor").post(tutorController.createTutor);
router.route("/tutors").get(tutorController.getTutors)
router.route("/tutor/:id").put(tutorController.updateTutor)
router.route("/tutor/:id").delete(tutorController.deleteTutor)

export default router


