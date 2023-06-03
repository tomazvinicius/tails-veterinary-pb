import { Pet } from "./Pet"

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



}