import { Router } from "express";
import {
    createPet,
    updatePetById,
    deletePetById
} from "../controllers/PetController"

const router = Router();

router.route("/pet/:tutorId").post(createPet);
router.route("/pet/:petId/tutor/:tutorId").put(updatePetById)
router.route("/pet/:petId/tutor/:tutorId").delete(deletePetById)

export default router
