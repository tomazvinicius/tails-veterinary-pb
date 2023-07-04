import { Request, Response } from "express";
import PetService from "../services/petService";
import TutorService from "../services/tutorservice";
import { Pet } from "../models/Pet";
import StatusCodes from "http-status-codes";

const petService = new PetService();
const tutorService = new TutorService();

class PetController {
  async createPet(req: Request, res: Response): Promise<void> {
    try {
      const tutorId: string = req.params.tutorId;
      const petData: Pet = req.body;

      await tutorService.verifyTutor(tutorId);

      const createdPet: Pet = await tutorService.addPetToTutor(
        tutorId,
        petData
      );
      res.status(StatusCodes.CREATED).json(createdPet);
      return;
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to create pet" });
      return;
    }
  }

  async updatePet(req: Request, res: Response) {
    try {
      const tutorId = req.params.tutorId;
      const petId = req.params.petId;
      const petData = req.body;
      const updatePet = await petService.updatePet(petData, petId, tutorId);
      res.status(StatusCodes.OK).json(updatePet);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to update Pet" });
    }
  }

  async deletePet(req: Request, res: Response) {
    try {
      const tutorId = req.params.tutorId;
      const petId = req.params.petId;
      const deletePet = await petService.deletePet(tutorId, petId);
      res.status(StatusCodes.NO_CONTENT).json(deletePet);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete pet" });
    }
  }
}

export default PetController;
