import { Schema, Document, model, Types } from "mongoose";
import { Pet } from "./Pet";

export interface Tutor extends Document {
  name: string;
  phone: string;
  email: string;
  date_of_birth: Date;
  zip_code: string;
  password: string;
  pets: Pet[];
}

const tutorSchema = new Schema<Tutor>({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [4, "Name must be greater"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  email: {
    type: String,
    required: [true, "Tutor email is required"],
    validate: {
      validator: function (email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    unique: true,
  },
  date_of_birth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  zip_code: {
    type: String,
    required: [true, "Zip code is required"],
    minlength: [9, "Zip code required 9 of length"],
  },
  password: {
    type: String,
    required: [true, "Tutor password is required"],
  },
  pets: [
    {
      type: Schema.Types.Mixed,
      ref: "Pet",
    },
  ],
});

const TutorModel = model<Tutor>("Tutor", tutorSchema);

export default TutorModel;
