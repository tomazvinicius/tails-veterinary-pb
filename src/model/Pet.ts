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


}