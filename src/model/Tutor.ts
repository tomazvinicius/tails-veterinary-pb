export class Tutor {
    id: number;
    name: string;
    phone: string;
    email: string;
    date_of_birth: Date;
    zip_code: string;

    constructor(
        id: number,
        name: string,
        phone: string,
        email: string,
        date_of_bitrh: Date,
        zip_code: string
    ) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.date_of_birth = date_of_bitrh;
        this.zip_code = zip_code;
    }
}