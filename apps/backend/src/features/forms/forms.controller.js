import { validationResult } from "express-validator";
import {
    submitSignUpForm,
    submitContactForm,
    fetchAllSignUpForms,
    fetchAllContactForms,
} from "./forms.service.js";

export async function submitForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const result = await submitSignUpForm(req.body);
        res.status(200).json({
            message: "Form submitted successfully!",
            id: result.id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function contactForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const result = await submitContactForm(req.body);
        res.status(200).json({
            message: "Contact form submitted successfully!",
            id: result.id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getAllSignUpForms(req, res) {
    try {
        const { limit, offset } = req.query;
        const result = await fetchAllSignUpForms(parseInt(limit), parseInt(offset));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getAllContactForms(req, res) {
    try {
        const { limit, offset } = req.query;
        const result = await fetchAllContactForms(parseInt(limit), parseInt(offset));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
