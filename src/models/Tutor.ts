import Joi from "joi";
import { Pet } from "./Pet";

export class Tutor {
    id: number;
    name: string;
    phone: string;
    email: string;
    date_of_birth: Date;
    zip_code: string;
    pets: Pet[];

    constructor(
        id: number,
        name: string,
        phone: string,
        email: string,
        date_of_bitrh: Date,
        zip_code: string,
        pets: Pet[] = [],
    ) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.date_of_birth = date_of_bitrh;
        this.zip_code = zip_code;
        this.pets = pets;
    }

    static validate(tutor: Tutor): Joi.ValidationResult {
        const tutorSchema = Joi.object<Tutor>({
            id: Joi.number(),
            name: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().required(),
            date_of_birth: Joi.string().required(),
            zip_code: Joi.string().required(),
            pets: Joi.allow()
        })
        return tutorSchema.validate(tutor)
    }


}