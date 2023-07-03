import mongoose, { Schema, Document, Types } from "mongoose";

export interface Tutor extends Document {
  name: string;
  phone: string;
  email: string;
  date_of_birth: Date;
  zip_code: string;
  password: string;
  pets: Types.Array<Types.ObjectId>;
}

const tutorSchema: Schema<Tutor> = new Schema<Tutor>({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [4, "Name must be at least 4 characters long"],
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
      message: (props: { value: string }) => `${props.value} is not a valid email address!`,
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
    minlength: [9, "Zip code must be 9 characters long"],
  },
  password: {
    type: String,
    required: [true, "Tutor password is required"],
  },
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
});

const TutorModel = mongoose.model<Tutor>("Tutor", tutorSchema);

export default TutorModel;
