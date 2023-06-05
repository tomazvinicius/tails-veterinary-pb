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
        // Search for id by url
        const tutorId = Number(req.params.tutorId);
        // Look for id inside array
        const tutorIndex = getIdTutor(tutorId)

        if (tutorIndex === -1) {
            return res.status(404).json({ message: 'Tutor not found' });
        }
        let id = pet.length + 1
        // Get body data
        const { name, species, carry, weight, date_of_birth } = req.body as {
            id: number;
            name: string;
            species: string;
            carry: string;
            weight: number;
            date_of_birth: Date;
        };
        // Create pet
        const newPet: Pet = { id, name, species, carry, weight, date_of_birth };
        pet.push(newPet)

        // Validating pet
        const { error } = Pet.validate(newPet)
        if (error) {
            res.status(500).json(error.message);
        } else {
            // Adding pet in tutor
            addPetInTutor(newPet, tutorIndex);
            res.status(200).json({ message: "We have finished creating the pet!", Pets: newPet })
        }

    } catch (error) {
        throw new Error("Unable to create pet, please try again!")
    }
}

const updatePetById = (req: Request, res: Response) => {
    try {
        // Search for id by url
        const tutorId = Number(req.params.tutorId);
        const petId = Number(req.params.petId);

        let id = pet.length
        // Get body data
        const { name, species, carry, weight, date_of_birth } = req.body as {
            id: number;
            name: string;
            species: string;
            carry: string;
            weight: number;
            date_of_birth: Date;
        };
        // Look for id pet inside array
        const petIndex = pet.findIndex((pet) => pet.id === petId);

        if (petIndex === -1) {
            res.status(404).json("Pet not found");
        }
        // Look for id tutor inside array
        const tutorIndex = getIdTutor(tutorId);

        if (tutorIndex === -1) {
            res.status(404).json("Tutor not found");
        }
        // Create pet
        const newPet = new Pet(id, name, species, carry, weight, date_of_birth);

        // Validating pet
        const { error } = Pet.validate(newPet)
        if (error) {
            res.status(500).json(error.message);
        } else {
            // Adding pet in tutor
            pet[petIndex] = newPet;
            updatePetInTutor(newPet, tutorIndex, petIndex);
            res.status(200).json({ msg: "Pet updated successfully", NewPet: pet[petIndex] });
        }

    } catch (error) {
        throw new Error("Unable to update pet, please try again!")
    }
}
const deletePetById = (req: Request, res: Response) => {

    try {
        // Search for id by url
        const tutorId = Number(req.params.tutorId);
        const petId = Number(req.params.petId);
        // Look for id pet inside array
        const petIndex = pet.findIndex((pet) => pet.id === petId)
        if (petIndex < -1) {
            throw new Error("Could not find pet")
        }
        const tutorIndex = getIdTutor(tutorId);

        if (tutorIndex === -1) {
            res.status(404).json("Tutor not found");
        }
        // Deleting tutor
        pet.splice(petIndex, 1);
        deletePetInTutor(tutorIndex, petIndex)
        res.status(200).json({ message: "We have completed deleting the pet!" })
    } catch (error) {
        throw new Error("Unable to delete pet, please try again!")
    }
}

export {
    createPet,
    updatePetById,
    deletePetById
}