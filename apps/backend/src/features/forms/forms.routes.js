// routes/router.js

import express from "express";
import {
    getAllSignUpForms,
    getAllContactForms,
    submitForm,
    contactForm,
} from "./forms.controller.js";

const router = express.Router();

// Future feature-based routes
// router.use('/users', userRouter);
// router.use('/jobs', jobRouter);

// Routes for Sign-Up & Contact Forms from iron-wing-dispatching.com
router.route("/sign-up-forms").post(submitForm).get(getAllSignUpForms);
router.route("/contact-forms").post(contactForm).get(getAllContactForms);

// Example of other grouped routes (optional)
router.get("/health-check", (req, res) => res.json({ status: "OK" }));

export default router;
