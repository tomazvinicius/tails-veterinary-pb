import { Schema, Document, model } from "mongoose";

export interface Pet extends Document {
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth: Date;
}

const petSchema = new Schema<Pet>({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be greater"],
  },
  species: {
    type: String,
    required: [true, "Species is required"],
  },
  carry: {
    type: String,
    required: [true, "Carry is required"],
  },
  weight: {
    type: Number,
    required: [true, "Weight is required"],
    min: [0.1, "The pet weight must be greater than 0"],
  },
  date_of_birth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
});

const PetModel = model<Pet>("Pet", petSchema);

export default PetModel;
