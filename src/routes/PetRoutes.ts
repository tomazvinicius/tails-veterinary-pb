import express from "express";
const router = express.Router();

import PetController from "../controllers/PetController";
const petController = new PetController();

router.post("/pet/:tutorId", petController.createPet);
router
  .route("/pet/:petId/tutor/:tutorId")
  .put(petController.updatePet)
  .delete(petController.deletePet);

export default router;
