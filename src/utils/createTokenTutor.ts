import { Tutor } from "../models/Tutor";

const createTokenTutor = async (tutor: Tutor) => {
  return { tutorId: tutor._id, name: tutor.name };
};

export default createTokenTutor;
