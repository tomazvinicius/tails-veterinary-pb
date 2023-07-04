import { Request, Response } from "express";
import TutorService from "../services/tutorservice";
import { Tutor } from "../models/Tutor";
import StatusCodes from "http-status-codes";

const tutorService = new TutorService();

class TutorController {
  async getAllTutors(req: Request, res: Response): Promise<void> {
    try {
      const tutors: Tutor[] = await tutorService.getAllTutors();
      res.status(StatusCodes.OK).json(tutors);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch tutors" });
    }
  }

  async createTutor(req: Request, res: Response): Promise<void> {
    try {
      const tutorData: Tutor = req.body;
      const createdTutor: Tutor = await tutorService.createTutor(tutorData);
      res.status(StatusCodes.CREATED).json(createdTutor);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to create tutor" });
    }
  }

  async updateTutor(req: Request, res: Response): Promise<void> {
    try {
      const tutorId: string = req.params.id;
      const tutorData: Tutor = req.body;
      const editedTutor: Tutor = await tutorService.updateTutor(
        tutorId,
        tutorData
      );
      res.status(StatusCodes.OK).json(editedTutor);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to edit tutor" });
    }
  }

  async deleteTutor(req: Request, res: Response): Promise<void> {
    try {
      const tutorId: string = req.params.id;
      const tutorDeleted = await tutorService.deleteTutor(tutorId);
      res.status(StatusCodes.NO_CONTENT).json(tutorDeleted);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete tutor" });
    }
  }
}

export default TutorController;
