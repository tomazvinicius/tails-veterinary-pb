import Joi from "joi";

export class Pet {

    id: number;
    name: string;
    species: string;
    carry: string;
    weight: number;
    date_of_birth: Date;

    constructor(
        id: number,
        name: string,
        species: string,
        carry: string,
        weight: number,
        date_of_bitrh: Date

    ) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.carry = carry;
        this.weight = weight;
        this.date_of_birth = date_of_bitrh;
    }

    static validate(pet: Pet): Joi.ValidationResult {
        const tutorSchema = Joi.object<Pet>({
            id: Joi.number(),
            name: Joi.string().required(),
            species: Joi.string().required(),
            carry: Joi.string().required(),
            weight: Joi.number().required(),
            date_of_birth: Joi.string().required(),

        })
        return tutorSchema.validate(pet)
    }
}