import express from "express";
const router = express.Router();

import PetController from "../controllers/PetController";
const petController = new PetController();


router.route("/pet/:tutorId").post(petController.createPet);
router.route("/pet/:petId/tutor/:tutorId").put(petController.updatePetById)
router.route("/pet/:petId/tutor/:tutorId").delete(petController.deletePetById)

export default router
