import express from "express";
import {
    getAllSignUpForms,
    getAllContactForms,
    submitForm,
    contactForm,
} from "./forms.controller.js";

const formRouter = express.Router();

// Future feature-based routes
// formRouter.use('/users', userRouter);
// formRouter.use('/jobs', jobRouter);

// Routes for Sign-Up & Contact Forms from iron-wing-dispatching.com
formRouter.route("/sign-up-forms").post(submitForm).get(getAllSignUpForms);
formRouter.route("/contact-forms").post(contactForm).get(getAllContactForms);

// Example of other grouped routes (optional)
formRouter.get("/health-check", (req, res) => res.json({ status: "OK" }));

export default formRouter;
