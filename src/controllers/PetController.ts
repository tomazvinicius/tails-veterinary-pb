import { Request, Response } from "express";
import PetService from "../services/petService";
import TutorService from "../services/tutorservice";
import { Pet } from "../models/Pet";

const petService = new PetService();
const tutorService = new TutorService();

class PetController{
  async createPet(req: Request, res: Response):Promise<void>  {
    try {
        const tutorId: string = req.params.tutorId;
        const petData: Pet = req.body;
  
        const createdPet: Pet = await tutorService.addPetToTutor(
          tutorId,
          petData
        );
  
        res.json(createdPet);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create pet" });
      }
}
async updatePetById(req: Request, res: Response): Promise<void>  {
  try {
      const petId: string = req.params.id;
      const petData: Pet = req.body;
      const editedPet: Pet = await petService.updatePet(petId, petData);
      res.json(editedPet);
    } catch (error) {
      res.status(500).json({ error: "Failed to edit pet" });
    }
}

async deletePetById(req: Request, res: Response):Promise<void>  {
  try {
      const petId: string = req.params.id;
      await petService.deletePet(petId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete pet" });
    }
}

}
export default PetController;
