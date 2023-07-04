import { RequestHandler } from "express";
import TutorService from "../services/tutorservice";
import createTokenTutor from "../utils/createTokenTutor";
import { createJWT } from "../utils/jwt";
const tutorService = new TutorService();

export const auth: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      res.status(400).json(`Please provide email and password`);
      return;
    }

    const tutor = await tutorService.auth(email, password);
    if (tutor === null) {
      res.status(401).json(`Email or password incorret`);
      return;
    }

    const tokenTutor = await createTokenTutor(tutor);
    const token = await createJWT(tokenTutor);

    res.json({ access_token: token });
  } catch (error) {
    res.status(401).json(`Not authenticated`);
  }
};
