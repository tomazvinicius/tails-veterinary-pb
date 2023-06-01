import { Router } from "express";

import {
    createTutor,
    getTutors,
    updateTutorById,
    deleteTutor
} from "../controllers/TutorController"


const router = Router();

router.route("/tutor").post(createTutor);
router.route("/tutors").get(getTutors)
router.route("/tutor/:id").put(updateTutorById)
router.route("/tutor/:id").delete(deleteTutor)

export default router
