import { Request, Response } from "express";
import { Pet } from "../model/Pet";
import {
    getIdTutor,
    addPetInTutor,
    updatePetInTutor,
    deletePetInTutor

} from "../controllers/TutorController";

const pet: Pet[] = [];


const createPet = (req: Request, res: Response) => {
    try {

        const tutorId = Number(req.params.tutorId);

        const tutorIndex = getIdTutor(tutorId)

        if (tutorIndex === -1) {
            return res.status(404).json({ message: 'Tutor not found' });
        }
        let id = pet.length + 1
        const { name, species, carry, weight, date_of_birth } = req.body as {
            id: number;
            name: string;
            species: string;
            carry: string;
            weight: number;
            date_of_birth: Date;
        };

        const newPet: Pet = { id, name, species, carry, weight, date_of_birth };

        pet.push(newPet)
        addPetInTutor(newPet, tutorIndex);

        res.status(200).json({ message: "We have finished creating the pet!", Pets: newPet })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


const updatePetById = (req: Request, res: Response) => {
    try {
        const tutorId = Number(req.params.tutorId);
        const petId = Number(req.params.petId);

        let id = pet.length
        const { name, species, carry, weight, date_of_birth } = req.body as {
            id: number;
            name: string;
            species: string;
            carry: string;
            weight: number;
            date_of_birth: Date;
        };

        const petIndex = pet.findIndex((pet) => pet.id === petId);

        if (petIndex === -1) {
            res.status(404).json("Pet not found");
        }
        const tutorIndex = getIdTutor(tutorId);

        if (tutorIndex === -1) {
            res.status(404).json("Tutor not found");
        }

        const newPet = new Pet(id, name, species, carry, weight, date_of_birth);

        pet[petIndex] = newPet;

        updatePetInTutor(newPet, tutorIndex, petIndex);
        res.status(200).json({ msg: "Pet updated successfully", NewPet: pet[petIndex] });
    } catch (error) {
        res.status(500).json(error);
    }
}
const deletePetById = (req: Request, res: Response) => {


    try {
        const tutorId = Number(req.params.tutorId);
        const petId = Number(req.params.petId);

        const petIndex = pet.findIndex((pet) => pet.id === petId)
        if (petIndex < -1) {
            throw new Error("Could not find pet")
        }
        const tutorIndex = getIdTutor(tutorId);

        if (tutorIndex === -1) {
            res.status(404).json("Tutor not found");
        }

        pet.splice(petIndex, 1);
        deletePetInTutor(tutorIndex, petIndex)
        res.status(200).json({ message: "We have completed deleting the pet!" })
    } catch (error) {
        throw new Error("Pet not found")
    }
}

export {
    createPet,
    updatePetById,
    deletePetById
}