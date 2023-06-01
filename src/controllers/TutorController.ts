import { Request, Response } from "express";
import { Tutor } from "../model/Tutor";

const tutor: Tutor[] = [];

const createTutor = (req: Request, res: Response) => {
    try {
        const { id, name, phone, email, date_of_birth, zip_code } = req.body as {
            id: number;
            name: string;
            phone: string;
            email: string;
            date_of_birth: Date;
            zip_code: string;
        };
        const newTutor = new Tutor(id, name, phone, email, date_of_birth, zip_code);
        tutor.push(newTutor);
        res.status(200).json({ message: "We have finished creating the tutor!", Tutor: newTutor })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
const getTutors = (req: Request, res: Response) => {
    try {
        res.status(200).json({ Tutors: tutor });
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateTutorById = (req: Request, res: Response) => {
    try {
        const tutorId = Number(req.params.id);
        const { id, name, phone, email, date_of_birth, zip_code } = req.body as {
            id: number;
            name: string;
            phone: string;
            email: string;
            date_of_birth: Date;
            zip_code: string;
        };
        const tutorIndex = tutor.findIndex((tutor) => tutor.id === tutorId);

        tutor[tutorIndex] = new Tutor(
            id,
            name,
            phone,
            email,
            date_of_birth,
            zip_code
        );
        res.status(200).json("We have completed the tutor update!")

    } catch (error) {
        res.status(500).json({ message: error })
    }
}
const deleteTutor = (req: Request, res: Response) => {
    const tutorId = Number(req.params.id);

    try {
        const tutorIndex = tutor.findIndex((tutor) => tutor.id === tutorId)
        if (tutorIndex < 0) {
            throw new Error("Could not find tutor")
        }
        tutor.splice(tutorIndex, 1);
        res.status(200).json({ message: "We have completed deleting the tutor!" })
    } catch (error) {
        throw new Error("Tutor not found")
    }


}


export {
    createTutor,
    getTutors,
    updateTutorById,
    deleteTutor
}