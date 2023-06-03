import { Request, Response } from "express";
import { Tutor } from "../model/Tutor";
import { Pet } from "../model/Pet";

const tutor: Tutor[] = [];


const createTutor = (req: Request, res: Response) => {

    try {
        let id = tutor.length + 1
        const { name, phone, email, date_of_birth, zip_code, pet } = req.body as {

            name: string;
            phone: string;
            email: string;
            date_of_birth: Date;
            zip_code: string;
            pet: [];
        };
        const newTutor = new Tutor(id, name, phone, email, date_of_birth, zip_code, pet);
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
        let id = tutor.length + 1
        const { name, phone, email, date_of_birth, zip_code, pet } = req.body as {

            name: string;
            phone: string;
            email: string;
            date_of_birth: Date;
            zip_code: string;
            pet: []
        };
        const tutorIndex = tutor.findIndex((tutor) => tutor.id === tutorId);

        tutor[tutorIndex] = new Tutor(
            id,
            name,
            phone,
            email,
            date_of_birth,
            zip_code,
            pet
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

export function getIdTutor(tutorId: number) {

    const tutorIndex = tutor.findIndex((tutor) => tutor.id === tutorId);

    return tutorIndex;
}

export function addPetInTutor(pets: Pet, tutorIndex: number): void {

    tutor[tutorIndex].pets.push(pets);

}

export function updatePetInTutor(pet: Pet, indexTutor: number, indexPet: number): void {
    tutor[indexTutor].pets.splice(indexPet, 1, pet);
}

export function deletePetInTutor(indexTutor: number, indexPet: number): void {

    tutor[indexTutor].pets.splice(indexPet, 1);
}


export {
    createTutor,
    getTutors,
    updateTutorById,
    deleteTutor,


}