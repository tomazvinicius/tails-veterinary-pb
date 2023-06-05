import { Request, Response } from "express";
import { Tutor } from "../model/Tutor";
import { Pet } from "../model/Pet";

const tutor: Tutor[] = [];


const createTutor = (req: Request, res: Response) => {

    try {
        let id = tutor.length + 1
        // Get body data
        const { name, phone, email, date_of_birth, zip_code, pet } = req.body as {
            name: string;
            phone: string;
            email: string;
            date_of_birth: Date;
            zip_code: string;
            pet: [];
        };

        // Create tutor
        const newTutor = new Tutor(id, name, phone, email, date_of_birth, zip_code, pet);

        // Validating tutor
        const { error } = Tutor.validate(newTutor)
        if (error) {
            res.status(500).json(error.message);
        } else {
            // Update in tutor
            tutor.push(newTutor);
            res.status(200).json({ message: "We have finished creating the tutor!", tutor: newTutor })
        }
    } catch (error) {
        throw new Error("Unable to create tutor, try again!")
    }
};

const getTutors = (req: Request, res: Response) => {
    try {
        res.status(200).json({ tutors: tutor });
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateTutorById = (req: Request, res: Response) => {
    try {
        // Search for id by url
        const tutorId = Number(req.params.id);

        let id = tutor.length
        // Get body data
        const { name, phone, email, date_of_birth, zip_code } = req.body as {
            name: string;
            phone: string;
            email: string;
            date_of_birth: Date;
            zip_code: string;
            pet: []
        };
        // Look for id tutor inside array
        const tutorIndex = tutor.findIndex((tutor) => tutor.id === tutorId);
        // Look for id pet inside array
        const pets = tutor.find((tutor) => tutor.id === tutorId);
        // To put the old pets inside the tutor that is being updated
        const oldPets = pets?.pets;
        if (tutorIndex === -1) {
            throw new Error("Could not find tutor")
        }
        // Get body data
        tutor[tutorIndex] = new Tutor(
            id,
            name,
            phone,
            email,
            date_of_birth,
            zip_code,
            oldPets
        );
        // Validating tutor
        const { error } = Tutor.validate(tutor[tutorIndex])
        if (error) {
            res.status(500).json(error.message);
        } else {
            res.status(200).json("We have completed the tutor update!")
        }
    } catch (error) {
        throw new Error("Unable to update tutor, please try again!")
    }
}

const deleteTutor = (req: Request, res: Response) => {

    try {
        // Search for id by url
        const tutorId = Number(req.params.id);
        // Look for id tutor inside array
        const tutorIndex = tutor.findIndex((tutor) => tutor.id === tutorId)
        if (tutorIndex === -1) {
            throw new Error("Could not find tutor")
        }
        // Deleting tutor
        tutor.splice(tutorIndex, 1);
        res.status(200).json({ message: "We have completed deleting the tutor!" })
    } catch (error) {
        throw new Error("Unable to delete tutor, try again!")
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